import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    if (!mobile.match(/^[6-9]\d{9}$/)) {
      setError("Invalid mobile number");
    } else {
      alert("Password reset link sent to your mobile");
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset}>
        <label>Enter Mobile Number:</label>
        <input type="text" onChange={(e) => setMobile(e.target.value)} />
        <span className="error">{error}</span>

        <button type="submit">Reset Password</button>
      </form>
      <p onClick={() => navigate("/login")}>Back to Login</p>
    </div>
  );
};

export default ForgotPassword;
