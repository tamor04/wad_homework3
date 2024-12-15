const express = require('express');
const pool = require('./db');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const port = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(express.json());
app.use(cookieParser());

const secret = "bahusv79ofh983bsader";
const maxAge = 60 * 60;
const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
}

// Register route handlers
//app.use('/auth', authRoutes); // Handles signup and login
//app.use('/posts', postRoutes); // Handles CRUD operations for posts


// Posts handling

//adds a post to the database
app.post('/api/posts', async(req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posttable(title, body, urllink) values ($1, $2, $3)    RETURNING*", [post.title, post.body, post.urllink]
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
  });
  
  //gets the posts from the database
  app.get('/api/posts', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posttable"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
  });
  
  app.get('/api/posts/:id', async(req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        const { id } = req.params;
        const posts = await pool.query(
            "SELECT * FROM posttable WHERE id = $1", [id]
        );
        res.json(posts.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
  });
  
  app.put('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        console.log("update request has arrived");
        if (!body) {
            return res.status(400).json({ error: "Body is required" });
        }
        const updatePost = await pool.query(
            "UPDATE posttable SET body = $2 WHERE id = $1 RETURNING *",
            [id, body]
        );
        if (updatePost.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

    res.json({ message: "Post updated successfully", post: updatePost.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //deletes a post from the database
  app.delete('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        console.log("delete a post request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM posttable WHERE id = $1 RETURNING*", [id]
        );
        if (deletePost.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
  
  //deletes all the posts from the database
  app.delete('/api/posts', async (req, res) => {
    try {
        console.log("Delete all posts request has arrived");
        const deleteAllPosts = await pool.query(
            "DELETE FROM posttable RETURNING *"
        );
        res.json(deleteAllPosts.rows); // Send back the deleted rows as confirmation
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});



//Authentication
app.get('/auth/authenticate', async(req, res) => {
  console.log('auth request');
  const token = req.cookies.jwt; // assign the token named jwt to the token const
  console.log("token " + token);
  let authenticated = false;
  try {
      if (token) {
          await jwt.verify(token, secret, (err) => { //verification
              if (err) {
                  console.log(err.message);
                  console.log('token is not verified');
                  res.send({ "authenticated": authenticated });
              } else {
                  console.log('author is authinticated');
                  authenticated = true;
                  res.send({ "authenticated": authenticated });
              }
          })
      } else {
          console.log('author is not authinticated');
          res.send({ "authenticated": authenticated });
      }
  } catch (err) {
      console.error(err.message);
      res.status(400).send(err.message); 
  }
});

// Login/Signup handling

app.post('/auth/signup', async(req, res) => {
  try {
      console.log("a signup request has arrived");
      const { email, password } = req.body;
      const salt = await bcrypt.genSalt();
      const bcryptPassword = await bcrypt.hash(password, salt)
      const authUser = await pool.query(
          "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
      );
      console.log(authUser.rows[0].id);
      const token = await generateJWT(authUser.rows[0].id);
      res
          .status(201)
          .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
          .json({ user_id: authUser.rows[0].id })
          .send;
  } catch (err) {
    if (err.code === '23505') { //23505 is for unique contstraints
      res.status(400).json({ error: 'A user with this email already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

app.post('/auth/login', async(req, res) => {
  try {
      console.log("a login request has arrived");
      const { email, password } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) return res.status(401).json({ error: "Incorrect password" });
      const token = await generateJWT(user.rows[0].id);
      res
          .status(201)
          .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
          .json({ user_id: user.rows[0].id })
          .send;
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
});

app.get('/auth/logout', (req, res) => {
  console.log('delete jwt request arrived');
  res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

// Server listener
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

