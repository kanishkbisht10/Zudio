-- Create database
CREATE DATABASE zudio_db;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  price INTEGER NOT NULL,
  image VARCHAR(500),
  description TEXT,
  stock INTEGER DEFAULT 10,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart items table
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  total_amount INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL
);

-- Insert sample products
INSERT INTO products (name, price, image, description, stock) VALUES
('Men''s T-Shirt', 599, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', 'Comfortable cotton t-shirt for men', 20),
('Women''s Kurti', 799, 'https://images.unsplash.com/photo-1583391733956-6c78276477e9', 'Traditional women''s kurti', 15),
('Kids Jacket', 999, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf', 'Warm jacket for kids', 10),
('Women''s Dress', 1299, 'https://images.unsplash.com/photo-1595777707802-07aabfc44ae5', 'Elegant women''s dress', 12),
('Men''s Jeans', 1099, 'https://images.unsplash.com/photo-1542272604-787c62d465d1', 'Classic blue jeans', 18),
('Women''s Saree', 1599, 'https://images.unsplash.com/photo-1605777927817-73b9f9d0f0c7', 'Beautiful silk saree', 8),
('Men''s Formal Shirt', 899, 'https://images.unsplash.com/photo-1596631125665-b122f0264b63', 'Professional formal shirt', 25),
('Women''s Lehenga', 2299, 'https://images.unsplash.com/photo-1623977926857-d5b6d5ed6c0a', 'Festive lehenga set', 5),
('Men''s Shorts', 499, 'https://images.unsplash.com/photo-1506629082632-33d53d265ae0', 'Casual summer shorts', 30);
