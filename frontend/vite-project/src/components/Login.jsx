import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

  try {
  const res = await axios.post(
    "http://localhost:5000/api/login",
    {
      email: email,
      password: password,
    }
  );

  if (res.data.accessToken) {
    localStorage.setItem("accessToken", res.data.accessToken);
    navigate("/");
  } else {
    setError("Access token was not received from the server.");
  }
} catch (err) {
  setError(
    err.response?.data?.message || "Invalid email or password"
  );
} finally {
  setLoading(false);
}
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Link to="/" className="login-brand" aria-label="Fixnear home">
          <span className="login-brand-icon" aria-hidden="true">F</span>
          <span>
            Fix<span className="login-brand-highlight">near</span>
          </span>
        </Link>
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Login to your Fixnear account</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="login-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
