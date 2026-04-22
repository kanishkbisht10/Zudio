import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const API_URL = "https://zudio-2aq3.onrender.com/";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from backend
    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    const addToCart = (product) => {
      setCartItems([...cartItems, product]);
    };

    // Fallback products if API is not available
    const fallbackProducts = [
    {
      id: 1,
      name: "Men's T-Shirt",
      price: 599,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },
    {
      id: 2,
      name: "Women's Kurti",
      price: 799,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e9"
    },
    {
      id: 3,
      name: "Kids Jacket",
      price: 999,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
    },
    {
      id: 4,
      name: "Women's Dress",
      price: 1299,
      image: "https://images.unsplash.com/photo-1595777707802-07aabfc44ae5"
    },
    {
      id: 5,
      name: "Men's Jeans",
      price: 1099,
      image: "https://images.unsplash.com/photo-1542272604-787c62d465d1"
    },
    {
      id: 6,
      name: "Women's Saree",
      price: 1599,
      image: "https://images.unsplash.com/photo-1605777927817-73b9f9d0f0c7"
    },
    {
      id: 7,
      name: "Men's Formal Shirt",
      price: 899,
      image: "https://images.unsplash.com/photo-1596631125665-b122f0264b63"
    },
    {
      id: 8,
      name: "Women's Lehenga",
      price: 2299,
      image: "https://images.unsplash.com/photo-1623977926857-d5b6d5ed6c0a"
    },
    {
      id: 9,
      name: "Men's Shorts",
      price: 499,
      image: "https://images.unsplash.com/photo-1506629082632-33d53d265ae0"
    }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
  <Router>
    <Navbar cartCount={cartItems.length} />

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/" 
        element={
          <div>
            {loading && (
              <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
                Loading products...
              </div>
            )}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              padding: "20px",
              justifyContent: "center"
            }}>
              {displayProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  addToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </div>
        }
      />

      <Route 
        path="/cart" 
        element={<Cart cartItems={cartItems} />} 
      />
    </Routes>
  </Router>
);

 
  

}

export default App;
