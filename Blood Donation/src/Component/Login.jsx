import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = await login(formData);
        localStorage.setItem("token", data.token); // Save token for future requests
        alert("Login Successful");
        navigate("/");
      } catch (error) {
        setErrorMessage(error.response?.data?.error || "Invalid credentials");
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <span className="error">{errors.email}</span>

        <label>Password:</label>
        <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <span className="error">{errors.password}</span>

        <button type="submit">Login</button>
      </form>
      <p onClick={() => navigate("/register")}>Don't have an account? Register</p>
      <p onClick={() => navigate("/forgot-password")} style={{ color: "blue", cursor: "pointer" }}>
        Forgot Password?
      </p>
    </div>
  );
};

export default Login;
