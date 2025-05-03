import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.mobile.match(/^[6-9]\d{9}$/))
      tempErrors.mobile = "Invalid mobile number";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = await register(formData);
        alert("Registration Successful");
        navigate("/login");
      } catch (error) {
        setErrorMessage(error.response?.data?.error || "Something went wrong");
      }
    }
  };

  return (
    <div className="container">
      <h2>Register for Blood Donation</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <span className="error">{errors.name}</span>

        <label>Email:</label>
        <input type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <span className="error">{errors.email}</span>

        <label>Mobile Number:</label>
        <input type="text" onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
        <span className="error">{errors.mobile}</span>

        <label>Password:</label>
        <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <span className="error">{errors.password}</span>

        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate("/login")}>Already have an account? Login</p>
    </div>
  );
};

export default Register;
