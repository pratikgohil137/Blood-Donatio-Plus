import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.mobile.match(/^[6-9]\d{9}$/))
      tempErrors.mobile = "Invalid mobile number";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Login Successful");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Mobile Number:</label>
        <input type="text" onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
        <span className="error">{errors.mobile}</span>

        <label>Password:</label>
        <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <span className="error">{errors.password}</span>

        <button type="submit">Login</button>
      </form>
      <p onClick={() => navigate("/register")}>Don't have an account? Register</p>
      <p onClick={() => navigate("/forgot-password")}>Forgot Password?</p>
    </div>
  );
};

export default Login;
