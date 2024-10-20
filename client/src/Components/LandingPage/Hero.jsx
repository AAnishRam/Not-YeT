import React, { useState, useEffect } from "react";
import illustration from "../../assets/Images/Team2.png";
import "./Hero.css"; // Import the new CSS file

const Hero = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTitle(true);
    }, 500);

    const timeout2 = setTimeout(() => {
      setShowSubtitle(true);
    }, 1000);

    const timeout3 = setTimeout(() => {
      setShowImage(true);
    }, 1500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div className="hero-container" id="home">
      <div className="hero-image-container">
        {showImage && (
          <img src={illustration} alt="illustration" className="hero-image" />
        )}
      </div>
      <div className="hero-text-container">
        {showTitle && (
          <h1 className="hero-title">
            <span className="hero-title-highlight">NOT</span> YET
          </h1>
        )}
        {showSubtitle && (
          <p className="hero-subtitle">
            Collaborative Workspace Management System for Enhancing
            Organizational Productivity and Communication
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;
