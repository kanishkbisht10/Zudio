import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Registration Successful!");
        navigate("/login");
      } catch (err) {
        toast.error(err.message);
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
        <h1>Create Account</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="input-premium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
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
            Register
          </button>
          <p style={{ color: "#aaa" }}>
            Already a member?{" "}
            <span className="auth-link" onClick={() => navigate("/login")}>
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;