import React from "react";
import { useInView } from "react-intersection-observer";
import "./FadeInSection.css"; // Import a new CSS file for styles

const FadeInSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`fade-in-section transition-opacity duration-1000 ${
        inView ? "fade-in-section-visible" : "fade-in-section-hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
