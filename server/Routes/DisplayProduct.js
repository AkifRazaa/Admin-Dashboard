const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");

// Route to get all products with user email
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("userId", "email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to delete a product by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
