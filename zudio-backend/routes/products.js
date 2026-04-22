const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    const transformedProducts = products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      stock: product.stock,
      createdAt: product.createdAt
    }));
    res.json(transformedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      stock: product.stock,
      createdAt: product.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new product (admin only)
router.post('/', async (req, res) => {
  const { name, price, image, description, stock } = req.body;
  try {
    const product = new Product({
      name,
      price,
      image,
      description,
      stock
    });
    const savedProduct = await product.save();
    res.status(201).json({
      id: savedProduct._id,
      name: savedProduct.name,
      price: savedProduct.price,
      image: savedProduct.image,
      description: savedProduct.description,
      stock: savedProduct.stock,
      createdAt: savedProduct.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  const { name, price, image, description, stock } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, description, stock },
      { new: true }
    );
    res.json({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      stock: product.stock,
      createdAt: product.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
