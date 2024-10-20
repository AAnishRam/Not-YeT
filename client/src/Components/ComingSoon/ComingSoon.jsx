import React, { useState, useEffect } from "react";
import "./ComingSoon.css";

const ComingSoon = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const calculateTimeLeft = () => {
    const eventDate = new Date("2024-11-01T00:00:00");
    const currentTime = new Date();
    const timeDifference = eventDate - currentTime;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => calculateTimeLeft(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="coming-soon-page">
      <div className="coming-soon-content">
        <h1>We're Launching Soon!</h1>
        <p>Our website is under construction, but we'll be here soon.</p>

        <div className="countdown">
          <div className="time-box">
            <span>{days}</span>
            <p>Days</p>
          </div>
          <div className="time-box">
            <span>{hours}</span>
            <p>Hours</p>
          </div>
          <div className="time-box">
            <span>{minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="time-box">
            <span>{seconds}</span>
            <p>Seconds</p>
          </div>
        </div>

        <div className="email-subscription">
          <input type="email" placeholder="Enter your email" />
          <button>Notify Me</button>
        </div>

        <div className="social-icons">
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
