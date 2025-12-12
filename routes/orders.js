const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');
const router = express.Router();

// create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = await Order.create({ user: req.user.id, items, total });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// list user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name image price"); // adjust as per your model

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
