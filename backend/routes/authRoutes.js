const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = express(); //.Router();

router.use(cors({ origin: 'http://localhost:8080', credentials: true }));

router.use(express.json());
router.use(cookieParser());

const secret = "bahusv79ofh983bsader";
const maxAge = 60 * 60;

const generateJWT = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: maxAge })
}



// Sign-Up Endpoint
router.post('/signup', async (req, res) => {
  console.log("sign up request");
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const autUser = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    const token = await generateJWT(authUser.rows[0].id);
    console.log(token);
    res.status(201).cookie('jwt', token, { maxAge: 6000000, httpOnly: true }).json({ user_id: authUser.rows[0].id }).send;

  } catch (err) {
    if (err.code === '23505') { //23505 is for unique contstraints
      res.status(400).json({ error: 'A user with this email already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get('/auth/authenticate', async(req, res) => {
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

// Login Endpoint
router.post('/login', async (req, res) => {
  console.log("login request");
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid email or password' });

    const token = await generateJWT(user.rows[0].id);
    res
      .status(201)
      .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
      .json({ user_id: user.rows[0].id })
      .send;
  } catch (err) {

    res.status(500).json({ error: err.message });
  }
});

//logout Endpoint
router.get('/logout', (req, res) => {
  console.log('delete jwt request');
  res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

module.exports = router;
