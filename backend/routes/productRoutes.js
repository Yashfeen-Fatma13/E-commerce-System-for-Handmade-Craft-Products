const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product (with image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "crochet-products" },
      async (error, result) => {
        if (error) return res.status(500).json(error);

        const product = await Product.create({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          image: result.secure_url,
        });

        res.json(product);
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;