const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// Get cart items for user
router.get('/:userId', async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.params.userId })
      .populate('product', 'name price image')
      .sort({ createdAt: 1 });
    
    const transformedItems = cartItems.map(item => ({
      id: item._id,
      user: item.user,
      product: {
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image
      },
      quantity: item.quantity,
      addedAt: item.createdAt
    }));
    
    res.json(transformedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: 'User ID and Product ID are required' });
  }

  try {
    // Check if item already in cart
    const existingItem = await CartItem.findOne({ user: userId, product: productId });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity || 1;
      const savedItem = await existingItem.save();
      return res.json({ message: 'Item quantity updated', item: {
        id: savedItem._id,
        user: savedItem.user,
        product: savedItem.product,
        quantity: savedItem.quantity,
        addedAt: savedItem.createdAt
      } });
    }

    // Add new item
    const cartItem = new CartItem({
      user: userId,
      product: productId,
      quantity: quantity || 1
    });

    const savedItem = await cartItem.save();
    res.status(201).json({ message: 'Item added to cart', item: {
      id: savedItem._id,
      user: savedItem.user,
      product: savedItem.product,
      quantity: savedItem.quantity,
      addedAt: savedItem.createdAt
    } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart item quantity
router.put('/:cartItemId', async (req, res) => {
  const { quantity } = req.body;

  try {
    const cartItem = await CartItem.findByIdAndUpdate(
      req.params.cartItemId,
      { quantity },
      { new: true }
    );
    res.json({ message: 'Item updated', item: {
      id: cartItem._id,
      user: cartItem.user,
      product: cartItem.product,
      quantity: cartItem.quantity,
      addedAt: cartItem.createdAt
    } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete('/:cartItemId', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.cartItemId);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart for user
router.delete('/user/:userId', async (req, res) => {
  try {
    await CartItem.deleteMany({ user: req.params.userId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
