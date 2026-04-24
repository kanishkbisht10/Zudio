import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "https://zudio-2aq3.onrender.com/api";

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

const ProductsPage = ({ refreshCartCount }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : fallbackProducts);
      setFilteredProducts(Array.isArray(data) ? data : fallbackProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setFilteredProducts(fallbackProducts);
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!auth.currentUser) {
      toast.error("Please log in to add items to your cart");
      return;
    }
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
      if (response.ok) {
        toast.success(`${product.name} added to cart`);
        if (refreshCartCount) refreshCartCount();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add item");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred");
    }
  };

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  // Categories based on product names
  const categories = ["All", "Men's", "Women's", "Kids"];

  // Filter products based on category and price
  useEffect(() => {
    let filtered = displayProducts;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter(product => product.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= parseInt(maxPrice));
    }

    setFilteredProducts(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, minPrice, maxPrice, products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px" }}>Latest Collection</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Discover the new season's trends</p>
      </div>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Sidebar */}
        <div style={{ width: "280px", flexShrink: 0 }}>
          <div className="glass" style={{ padding: "30px", borderRadius: "12px", position: "sticky", top: "100px" }}>
            <h3 style={{ textTransform: "uppercase", fontWeight: "800", marginBottom: "20px", letterSpacing: "1px" }}>Categories</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px 0" }}>
              {categories.map(category => (
                <li key={category} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    style={{
                      background: selectedCategory === category ? "var(--primary-color)" : "transparent",
                      color: selectedCategory === category ? "white" : "var(--text-primary)",
                      border: selectedCategory === category ? "none" : "1px solid #ddd",
                      padding: "10px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>

            <h3 style={{ textTransform: "uppercase", fontWeight: "800", marginBottom: "20px", letterSpacing: "1px" }}>Price Filter</h3>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="number"
                placeholder="Min"
                className="input-premium"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ padding: "10px" }}
              />
              <span style={{ fontWeight: "600" }}>-</span>
              <input
                type="number"
                placeholder="Max"
                className="input-premium"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ padding: "10px" }}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: "inline-block", width: "40px", height: "40px", border: "4px solid #f3f3f3", borderTop: "4px solid #000", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              <p style={{ marginTop: "15px", fontWeight: "600" }}>Loading collection...</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  addToCart={() => addToCart(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;