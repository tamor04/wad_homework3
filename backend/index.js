const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Register route handlers
app.use('/auth', authRoutes); // Handles signup and login
app.use('/posts', postRoutes); // Handles CRUD operations for posts

// Server listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
