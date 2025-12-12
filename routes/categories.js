const express = require('express');
const Category = require('../models/Category');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cats = await Category.find().limit(100);
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, admin, async (req, res) => {
  try {
    const c = await Category.create(req.body);
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
