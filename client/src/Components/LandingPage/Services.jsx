import React from "react";
import { services } from "../constants";
import "./Services.css"; // Import the new CSS file

const Services = () => {
  return (
    <div className="services-container" id="services">
      <div className="services-header">
        <h2 className="services-title">
          <span className="services-highlight">Services</span> we provide
        </h2>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="services-item">
            <div className="services-icon-container">
              <div className="services-icon">{service.icon}</div>
              <div>
                <h5 className="services-text">{service.text}</h5>
                <p className="services-description">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
