const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const Product = require("../Models/Product");

router.post("/add-product", async (req, res) => {
  try {
    const { name, price, quantity, pictures, userId } = req.body;

    // console.log({ name, price, quantity, pictures });

    // Upload images to Cloudinary
    const uploadedPictures = [];
    for (let picture of pictures) {
      const result = await cloudinary.uploader.upload(picture, {
        folder: "/Soft-Enterprise",
        format: "png",
      });
      uploadedPictures.push(result.secure_url);
    }

    console.log(uploadedPictures);

    // Save product in MongoDB
    const newProduct = new Product({
      name,
      price,
      quantity,
      pictures: uploadedPictures,
      userId,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product upload successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
});

module.exports = router;
