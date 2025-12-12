const router = require("express").Router();
const Product = require("../models/Product");

// GET /api/search?q=apple&page=1&limit=8
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.json([]);

    const products = await Product.find({
      name: { $regex: q, $options: "i" }
    })
      .select("name slug price image category")
      .limit(20);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    const page = Math.max(1, parseInt(req.query.page || "1"));
    const limit = Math.max(4, parseInt(req.query.limit || "8"));

    if (!q) {
      // Return popular / recent products when no query (optional)
      const popular = await Product.find().limit(limit).select("name price image").lean();
      return res.json({ results: popular });
    }

    // 1) Text search with score
    const textResults = await Product
      .find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" }, name: 1, slug:1, price:1, image:1, category:1 }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(limit)
      .lean();

    // If enough results, return
    if (textResults && textResults.length > 0) {
      return res.json({ results: textResults });
    }

    // 2) Fallback — regex prefix match (fast for small dataset; use autocomplete index for bigger)
    const regex = new RegExp("^" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const regexResults = await Product.find({
      $or: [{ name: regex }, { brand: regex }, { category: regex }]
    })
      .limit(limit)
      .select("name slug price image category")
      .lean();

    res.json({ results: regexResults });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
});

module.exports = router;
