import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/signin", {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // Store user details in local storage
      localStorage.setItem("userDetails", JSON.stringify(response.data));

      // Redirect to dashboard on successful login
      navigate("/projectHome");
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="signin-container">
      <div className="form-section">
        <h2 className="form-section-heading">Welcome Back!!</h2>
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
          <div className="form-group">
            <label className="signin-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="signin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p className="signin-or">- or -</p>
        </form>
        <div className="alternate">
          <p>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
