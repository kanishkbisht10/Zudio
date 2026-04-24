import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-dark">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <Logo width="100" color="white" />
        </div>
        <h1>Sign Out</h1>
        <p style={{ color: "#ccc", marginBottom: "30px", fontSize: "1.1rem" }}>Are you sure you want to log out?</p>
        
        <button
          onClick={handleLogout}
          className="btn-primary"
          style={{ width: "100%", padding: "14px", marginBottom: "15px", backgroundColor: "white", color: "black" }}
        >
          Yes, Sign Me Out
        </button>

        <button
          onClick={() => navigate("/")}
          className="btn-outline"
          style={{ width: "100%", padding: "14px", borderColor: "rgba(255,255,255,0.3)", color: "white" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Logout;
