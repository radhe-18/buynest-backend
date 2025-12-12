const router = require("express").Router();
const Address = require("../models/Address");
const { auth } = require("../middleware/auth");

// GET all addresses
router.get("/", auth, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id })
      .sort({ isDefault: -1, updatedAt: -1 });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new address
router.post("/", auth, async (req, res) => {
  try {
    const data = req.body;
    // if it's first address, make default
    const existingCount = await Address.countDocuments({ user: req.user.id });

    const addr = await Address.create({
      ...data,
      user: req.user.id,
      isDefault: existingCount === 0 ? true : !!data.isDefault,
    });

    // if isDefault true, unset others
    if (addr.isDefault) {
      await Address.updateMany(
        { user: req.user.id, _id: { $ne: addr._id } },
        { isDefault: false }
      );
    }

    res.status(201).json(addr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE address
router.put("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    let addr = await Address.findOne({ _id: id, user: req.user.id });
    if (!addr) return res.status(404).json({ message: "Address not found" });

    Object.assign(addr, data);
    await addr.save();

    if (addr.isDefault) {
      await Address.updateMany(
        { user: req.user.id, _id: { $ne: addr._id } },
        { isDefault: false }
      );
    }

    res.json(addr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE address
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const addr = await Address.findOneAndDelete({ _id: id, user: req.user.id });
    if (!addr) return res.status(404).json({ message: "Address not found" });
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SET default address (optional extra route)
router.post("/:id/default", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const addr = await Address.findOne({ _id: id, user: req.user.id });
    if (!addr) return res.status(404).json({ message: "Address not found" });

    addr.isDefault = true;
    await addr.save();

    await Address.updateMany(
      { user: req.user.id, _id: { $ne: id } },
      { isDefault: false }
    );

    res.json(addr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
