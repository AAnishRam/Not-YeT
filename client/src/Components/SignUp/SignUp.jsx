import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({}); // For storing validation errors

  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // Validation checks
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      formErrors.email = "Invalid email format";
    }

    if (!username) {
      formErrors.username = "Username is required";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop form submission if validation fails
    }

    try {
      // Post form data to backend
      const response = await axios.post("http://localhost:8080/api/signup", {
        email,
        username,
        password,
      });

      console.log("Sign-up successful:", response.data);

      // Store user details in local storage
      localStorage.setItem("userDetails", JSON.stringify(response.data));

      // Redirect on successful sign-up
      navigate("/projectCreation");
    } catch (error) {
      console.error("Sign-up error:", error.response.data);
      setErrors({ submit: "Failed to create an account. Please try again." });
    }
  };

  return (
    <div className="signup-container">
      <div className="form-section-signup">
        <h2 className="form-section-heading-signup">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group-signup">
            <label className="signup-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="signup-input"
              id="email"
              name="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {/* Username Field */}
          <div className="form-group">
            <label className="signup-label" htmlFor="username">
              User Name
            </label>
            <input
              type="text"
              className="signup-input"
              id="username"
              name="username"
              placeholder="Enter your user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="signup-label" htmlFor="password">
              Password
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="signup-input password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                ></i>
              </span>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="create-btn">
            Create Account
          </button>

          {errors.submit && <p className="error-message">{errors.submit}</p>}

          <p className="signup-or">- or -</p>
        </form>

        {/* Redirect to Sign In */}
        <div className="alternate">
          <p>
            Already have an account? <a href="/signin">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
