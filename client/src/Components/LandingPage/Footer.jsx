import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import "./Footer.css"; // Import the new CSS file

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h5 className="footer-heading">Not Yet</h5>
          <p className="footer-description">
            Collaborative Workspace Management System for Enhancing
            Organizational Productivity and Communication.
          </p>
        </div>
        <div className="footer-section">
          <h5 className="footer-heading">Quick Links</h5>
          <ul className="footer-links">
            <li className="footer-link-item">
              <a href="#home" className="footer-link">
                Home
              </a>
            </li>
            <li className="footer-link-item">
              <a href="#aboutus" className="footer-link">
                About Us
              </a>
            </li>
            <li className="footer-link-item">
              <a href="#services" className="footer-link">
                Services
              </a>
            </li>
            <li className="footer-link-item">
              <a href="#testimonials" className="footer-link">
                Testimonials
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h5 className="footer-heading">Stay Connected</h5>
          <div className="footer-socials">
            <a href="https://www.facebook.com/" className="footer-social-icon">
              <FiFacebook size={24} />
            </a>
            <a href="https://x.com/?lang=en" className="footer-social-icon">
              <FiTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/" className="footer-social-icon">
              <FiInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/" className="footer-social-icon">
              <FiLinkedin size={24} />
            </a>
            <a href="https://github.com/" className="footer-social-icon">
              <FiGithub size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2024 Not Yet. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
