const express = require('express');
const Product = require('../models/Product');
const { auth, admin } = require("../middleware/auth");
const router = express.Router();

// list products (optionally by category slug)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) filter = { category };
    const products = await Product.find(filter).populate('category').limit(100);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.json([]);

    const products = await Product.find({
      name: { $regex: q, $options: "i" }
    }).limit(50);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/slug/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// admin create/update/delete (simple)
const slugify = require("slugify");

router.post("/", auth, admin, async (req, res) => {
  try {
    const body = req.body;

    body.slug = slugify(body.name, { lower: true, strict: true });

    const p = await Product.create(body);
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', auth, admin, async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
