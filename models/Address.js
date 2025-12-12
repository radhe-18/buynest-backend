const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    label: { type: String, default: "Home" }, // e.g. Home, Work
    name: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true }, // house / flat / building
    line2: { type: String }, // area / locality
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    type: { type: String, enum: ["home", "work", "other"], default: "home" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
