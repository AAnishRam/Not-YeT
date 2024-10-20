import React from "react";
import { testimonials } from "../constants";
import "./Testimonials.css"; // Import the CSS file

const Testimonials = () => {
  return (
    <div className="testimonials-container" id="testimonials">
      <h2 className="testimonials-title">What people are saying</h2>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonials-item">
            <div className="testimonial-card">
              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-user-info">
                <img
                  src={testimonial.image}
                  alt={testimonial.user}
                  className="testimonial-image"
                />
                <div>
                  <h6 className="testimonial-user">{testimonial.user}</h6>
                  <span className="testimonial-job">{testimonial.job}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
