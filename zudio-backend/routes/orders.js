const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// Get all orders for user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });
    
    const transformedOrders = orders.map(order => ({
      id: order._id,
      user: order.user,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items.map(item => ({
        product: {
          id: item.product._id,
          name: item.product.name,
          image: item.product.image
        },
        quantity: item.quantity,
        price: item.price
      }))
    }));
    
    res.json(transformedOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order details with items
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('user', 'name email')
      .populate('items.product', 'name image');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      id: order._id,
      user: {
        id: order.user._id,
        name: order.user.name,
        email: order.user.email
      },
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items.map(item => ({
        product: {
          id: item.product._id,
          name: item.product.name,
          image: item.product.image
        },
        quantity: item.quantity,
        price: item.price
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  if (!userId || !items || !totalAmount) {
    return res.status(400).json({ error: 'User ID, items, and total amount are required' });
  }

  try {
    // Create order with items
    const orderItems = items.map(item => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    const order = new Order({
      user: userId,
      totalAmount,
      status: 'pending',
      items: orderItems
    });

    const savedOrder = await order.save();

    // Reduce product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear user's cart
    await CartItem.deleteMany({ user: userId });

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: savedOrder._id,
        user: savedOrder.user,
        totalAmount: savedOrder.totalAmount,
        status: savedOrder.status,
        createdAt: savedOrder.createdAt,
        items: savedOrder.items
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.put('/:orderId', async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    res.json({ message: 'Order status updated', order: {
      id: order._id,
      user: order.user,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items
    } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
