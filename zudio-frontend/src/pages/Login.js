import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      alert("Login Successful!");
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "30px",
          fontSize: "28px"
        }}>Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "15px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
              boxSizing: "border-box",
              transition: "border-color 0.3s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#ddd"}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "20px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
              boxSizing: "border-box",
              transition: "border-color 0.3s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#ddd"}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "transform 0.2s",
              marginBottom: "15px"
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          >
            Login
          </button>

          <p style={{ textAlign: "center", color: "#666", marginTop: "20px" }}>
            Don't have an account?{" "}
            <span
              style={{
                color: "#667eea",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline"
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;