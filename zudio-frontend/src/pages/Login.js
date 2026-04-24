import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login Successful!");
        navigate("/");
      } catch (err) {
        toast.error("Failed to login. Please check your credentials.");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-dark">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <Logo width="100" color="white" />
        </div>
        <h1>Welcome Back</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            className="input-premium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-premium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "25px" }}
          />
          <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px", marginBottom: "20px", backgroundColor: "white", color: "black" }}>
            Sign In
          </button>
          <p style={{ color: "#aaa" }}>
            Don't have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/register")}>
              Create one
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;