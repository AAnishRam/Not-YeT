import React from "react";
import { navItems } from "../constants";
import { Menu, X } from "lucide-react";
import logo from "../../assets/Images/Logo.jpg";
import "./Navbar.css"; // Import the new CSS file
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleNavClick = (href) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setMobileDrawerOpen(false);
    }
  };

  const navi = useNavigate();

  const toSign = () => {
    navi("/signin");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="navbar-title">
            <a href="#">NOT YET</a>
          </span>
        </div>

        <ul className="navbar-links">
          {navItems.map((item, index) => (
            <li key={index} className="navbar-link-item">
              <a
                href={item.href}
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="navbar-login-btn" onClick={toSign}>
          Login/Sign-up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
