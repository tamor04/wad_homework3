const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch All Posts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a Post
router.post('/', authenticateToken, async (req, res) => {
  const { body } = req.body;

  try {
    await pool.query('INSERT INTO posts (body) VALUES ($1)', [body]);
    res.status(201).json({ message: 'Post added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete All Posts
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM posts');
    res.json({ message: 'All posts deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
