import React, { useState } from "react";
import "./HomePage.css";
import menuIcon from "../../assets/Images/menu.png";
import profileIcon from "../../assets/Images/profile.png";
import BasicTabs from "./TasksBar/TasksBar"; // Assuming this handles task tabs
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleProfileToggle = () => setIsProfileOpen(!isProfileOpen);

  const navi = useNavigate();
  const handleSubmit = () =>{ 
    navi("/feedback");
  }

  const naviProject = () => {
    navi("/projectCreation");
  }

  return (
    <div
      className={`homepage-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <img
            src={menuIcon}
            alt="menu"
            className="menu-icon"
            onClick={handleSidebarToggle}
          />
          <h1 className="logo">NOT-YET</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>Dashboard</li>
            <li>My Tasks</li>
            <li>Projects</li>
            <li>Meetings</li>
            <li>Reports</li>
            <li>Settings</li>
            <li onClick={handleSubmit}>Feedback</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="top-navbar">
          <button onClick={naviProject}>Create Project</button>
          <div className="profile-section" onClick={handleProfileToggle}>
            <img src={profileIcon} alt="profile" className="profile-icon" />
          </div>
        </header>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="profile-dropdown">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        )}

        {/* Main Page Content */}
        <section className="page-content">
          <div className="project-header">
            <h1>Active Projects</h1>
            <p>Here are your current projects and tasks.</p>
          </div>

          {/* Projects Section */}
          <div className="project-cards">
            <div className="project-card">
              <h2>Project 1</h2>
              <p>Project description and task breakdown.</p>
              <div className="project-progress-bar">
                <div className="progress" style={{ width: "50%" }}></div>
              </div>
              <span>50% Complete</span>
            </div>
            <div className="project-card">
              <h2>Project 2</h2>
              <p>Project description and task breakdown.</p>
              <div className="project-progress-bar">
                <div className="progress" style={{ width: "75%" }}></div>
              </div>
              <span>75% Complete</span>
            </div>
            <div className="project-card">
              <h2>Project 3</h2>
              <p>Project description and task breakdown.</p>
              <div className="project-progress-bar">
                <div className="progress" style={{ width: "30%" }}></div>
              </div>
              <span>30% Complete</span>
            </div>
          </div>

          {/* Task Tabs */}
          <div className="tasks-tabs">
            <BasicTabs />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
