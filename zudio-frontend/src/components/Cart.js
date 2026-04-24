import { useState, useEffect } from "react";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "https://zudio-2aq3.onrender.com/api";

function Cart({ refreshCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`${API_URL}/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        toast.success("Removed from cart");
        fetchCart();
        if (refreshCartCount) refreshCartCount();
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("An error occurred");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + ((item.product?.price || 0) * (item.quantity || 1)), 0);

  if (loading) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center", minHeight: "80vh" }}>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (!auth.currentUser) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center", minHeight: "80vh" }}>
        <p>Please log in to view your cart.</p>
        <button onClick={() => navigate('/login')} className="btn-primary" style={{ marginTop: "20px" }}>Log In</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", minHeight: "80vh" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "30px", textTransform: "uppercase" }}>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div style={{ padding: "60px", textAlign: "center", background: "white", borderRadius: "12px", boxShadow: "var(--shadow-subtle)" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", marginBottom: "20px" }}>Your Zudio cart is empty.</p>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          {/* Cart Items List */}
          <div style={{ flex: "1 1 600px", background: "white", padding: "30px", borderRadius: "12px", boxShadow: "var(--shadow-subtle)" }}>
            <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: "15px", marginBottom: "20px" }}>Items ({cartItems.length})</h3>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: "20px", padding: "20px 0", borderBottom: "1px solid #eee", alignItems: "flex-start" }}>
                {item.product?.image && (
                  <img src={item.product.image} alt={item.product.name} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 10px 0", fontSize: "1.2rem", fontWeight: "600" }}>{item.product?.name}</h4>
                  <p style={{ margin: "0 0 5px 0", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Quantity: {item.quantity}</p>
                  <p style={{ margin: "0 0 15px 0", fontSize: "0.9rem", color: "green" }}>In Stock</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: "transparent", border: "none", color: "var(--text-secondary)", textDecoration: "underline", cursor: "pointer", padding: 0, fontWeight: "600", fontSize: "0.9rem" }}
                  >
                    Delete
                  </button>
                </div>
                <div style={{ textAlign: "right", paddingLeft: "20px" }}>
                  <span style={{ fontWeight: "800", fontSize: "1.2rem", color: "var(--primary-color)" }}>₹{item.product?.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div style={{ flex: "1 1 300px" }}>
            <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "var(--shadow-subtle)", position: "sticky", top: "100px" }}>
              <h3 style={{ marginBottom: "20px" }}>Order Summary</h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "var(--text-secondary)" }}>
                <span>Items ({cartItems.length}):</span>
                <span>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", color: "var(--text-secondary)" }}>
                <span>Delivery:</span>
                <span style={{ color: "green" }}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px", borderTop: "2px solid #eee", marginBottom: "30px" }}>
                <h3 style={{ margin: 0, textTransform: "uppercase" }}>Order Total</h3>
                <h3 style={{ margin: 0, fontWeight: "800", color: "#B12704" }}>₹{total}</h3>
              </div>
              
              <button className="btn-primary" style={{ width: "100%", background: "#FFD814", color: "black", borderRadius: "8px", textTransform: "none", border: "1px solid #FCD200" }}>
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
