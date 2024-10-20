import React from "react";
import { CheckCircle2 } from "lucide-react";
import { aboutUs } from "../constants";
import "./AboutUs.css"; // Import your new CSS file

const AboutUs = () => {
  return (
    <div className="aboutus-container" id="aboutus">
      <h2 className="aboutus-title">
        About
        <span className="aboutus-highlight"> Us</span>
      </h2>

      <div className="aboutus-content">
        <div className="aboutus-section">
          {aboutUs.map((item, index) => (
            <div key={index} className="aboutus-item">
              <div className="aboutus-icon-container">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="aboutus-item-title">{item.title}</h5>
                <p className="aboutus-item-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
