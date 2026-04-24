import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductsPage from "./pages/ProductsPage";
import Logout from "./pages/Logout";
import { Toaster } from "react-hot-toast";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = process.env.REACT_APP_API_URL || "https://zudio-2aq3.onrender.com/api";

function App() {
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                refreshCartCount(currentUser);
            } else {
                setCartCount(0);
            }
        });
        return () => unsubscribe();
    }, []);

    const refreshCartCount = async (currentUser = user) => {
        if (!currentUser) return;
        try {
            const token = await currentUser.getIdToken();
            const response = await fetch(`${API_URL}/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setCartCount(data.length);
            }
        } catch (error) {
            console.error("Failed to fetch cart count:", error);
        }
    };

    return (
      <>
        <Toaster position="top-center" />
        <Navbar cartCount={cartCount} />

        <Routes>
          <Route path="/" element={<ProductsPage refreshCartCount={refreshCartCount} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cart" element={<Cart refreshCartCount={refreshCartCount} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    );
}

export default App;
