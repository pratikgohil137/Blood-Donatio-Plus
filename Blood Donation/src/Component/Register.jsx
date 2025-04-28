import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.dob) tempErrors.dob = "Date of birth is required";
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
      alert("Registration Successful");
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <h2>Register for Blood Donation</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <span className="error">{errors.name}</span>

        <label>Date of Birth:</label>
        <input type="date" onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
        <span className="error">{errors.dob}</span>

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
