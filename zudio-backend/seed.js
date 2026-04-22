const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zudio_db');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    const products = [
      {
        name: 'Men\'s T-Shirt',
        price: 599,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        description: 'Comfortable cotton t-shirt for men',
        stock: 20
      },
      {
        name: 'Women\'s Kurti',
        price: 799,
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e9',
        description: 'Traditional women\'s kurti',
        stock: 15
      },
      {
        name: 'Kids Jacket',
        price: 999,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
        description: 'Warm jacket for kids',
        stock: 10
      },
      {
        name: 'Women\'s Dress',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1595777707802-07aabfc44ae5',
        description: 'Elegant women\'s dress',
        stock: 12
      },
      {
        name: 'Men\'s Jeans',
        price: 1099,
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1',
        description: 'Classic blue jeans',
        stock: 18
      },
      {
        name: 'Women\'s Saree',
        price: 1599,
        image: 'https://images.unsplash.com/photo-1623977926857-d5b6d5ed6c0a',
        description: 'Beautiful silk saree',
        stock: 8
      },
      {
        name: 'Men\'s Formal Shirt',
        price: 899,
        image: 'https://images.unsplash.com/photo-1596631125665-b122f0264b63',
        description: 'Professional formal shirt',
        stock: 25
      },
      {
        name: 'Women\'s Lehenga',
        price: 2299,
        image: 'https://images.unsplash.com/photo-1623977926857-d5b6d5ed6c0a',
        description: 'Festive lehenga set',
        stock: 5
      },
      {
        name: 'Men\'s Shorts',
        price: 499,
        image: 'https://images.unsplash.com/photo-1506629082632-33d53d265ae0',
        description: 'Casual summer shorts',
        stock: 30
      }
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error.message);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedProducts();
  process.exit(0);
};

runSeed();
