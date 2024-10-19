import React, { useState } from "react";
import axios from "axios";
import "./ForgetPassword.css"; // Reusing the same CSS for styling

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend for password reset
      const response = await axios.post(
        "http://localhost:8080/api/forget-password",
        { email }
      );

      // Set success message
      setMessage("Password reset link has been sent to your email.");
      setError(""); // Clear any previous error
    } catch (error) {
      // Set error message
      setError("Failed to send password reset link. Please try again.");
      setMessage(""); // Clear success message
    }
  };

  return (
    <div className="signin-container">
      <div className="form-section">
        <h2 className="form-section-heading-forget-password">
          Forgot Password?
        </h2>
        <div className="form-section-heading-forget-password-div">
          <p>
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="signin-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="signin-input"
              id="email"
              name="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Send Reset Link
          </button>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>

        <div className="alternate">
          <p>
            Remembered your password? <a href="/signin">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
