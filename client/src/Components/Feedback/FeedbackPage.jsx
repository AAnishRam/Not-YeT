import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import "./FeedbackPage.css";
import feedbackpic from "../../assets/Images/feedbackPicture.png";

const FeedbackPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For navigation

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContactNo = (contactNo) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contactNo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message

    // Validate inputs
    if (!firstName || !lastName || !email || !contactNo || !feedback) {
      setErrorMessage("Please fill out all fields.");
    } else if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
    } else if (!validateContactNo(contactNo)) {
      setErrorMessage("Please enter a valid 10-digit contact number.");
    } else {
      console.log("Form submitted successfully!");

      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNo("");
      setFeedback("");
    }
  };

  const handleDismissError = () => {
    setErrorMessage("");
  };

  return (
    <div className="whole">
      <div className="image-container">
        <img src={feedbackpic} alt="Feedback Illustration" />
      </div>
      <div className="container">
        <h1 className="heading">Customer Feedback</h1>
        <form onSubmit={handleSubmit} className="form-handling-group">
          <div className="form-group">
            <label className="label">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Contact No:</label>
            <input
              type="tel"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="textarea"
            />
          </div>
          <button type="submit" className="button">
            Submit Feedback
          </button>
        </form>

        {errorMessage && (
          <div className="error-box">
            <div className="error-box-content">
              <span className="message-content">{errorMessage}</span>
              <button onClick={handleDismissError} className="close-btn">
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
