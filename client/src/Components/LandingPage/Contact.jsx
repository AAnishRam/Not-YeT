import React from "react";
import Footer from "./Footer";
import "./Contact.css"; // Import your new CSS file

const Contact = () => {
  return (
    <div>
      <div className="contact-container" id="contact">
        <h6 className="contact-title">
          <span className="contact-highlight">Contact</span> Us
        </h6>
        <div className="contact-info">
          <div className="contact-details">
            <h3 className="contact-detail">
              Phone Number :
              <span className="contact-value"> +xx-xxxxxxxxxx</span>
            </h3>

            <h3 className="contact-detail">
              Email :<span className="contact-value"> notyet@email.com</span>
            </h3>
          </div>
        </div>

        <div className="contact-footer">
          <p className="footer-text">
            <span className="footer-collab">
              <a href="https://storyset.com/work">Collaborate and Excel</a>
            </span>
            <span className="footer-copyright">Copyright 2024 NOT YET</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
