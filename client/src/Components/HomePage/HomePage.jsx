import React, { useState } from "react";
import "./HomePage.css";
import menu from "../../assets/Images/menu.png";
import prof from "../../assets/Images/profile.png";
import ColorTabs from "./TasksBar/TasksBar";
import BasicTabs from "./TasksBar/TasksBar";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleCreateToggle = () => setIsCreateOpen(!isCreateOpen);
  const handleProfileToggle = () => setIsProfileOpen(!isProfileOpen);

  return (
    <div className={`total-homepage ${isMenuOpen ? "menu-open" : ""}`}>
      <div className={`homepage-body ${isMenuOpen ? "menu-active" : ""}`}>
        <div className="homepage-topbar">
          <div className="homepage-topbar-left">
            {/* Toggle menu on click */}
            <img
              src={menu}
              alt="menu"
              height={35}
              width={35}
              onClick={handleMenuToggle}
            />
            <div className="homepage-topbar-left-box-wrapper">
              <button
                className="homepage-topbar-left-box"
                onClick={handleCreateToggle}
              >
                <div className="homepage-topbar-left-box-circle">+</div>
                Create
              </button>

              {/* Create Popup Sidebar next to Create button */}
              {isCreateOpen && (
                <div className="create-popup">
                  <ul>
                    <li>Create Task</li>
                    <li>Create Project</li>
                    <li>Create Message</li>
                    <li>Create Hurdle</li>
                    <li>Create Meeting</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="homepage-topbar-center">
            <h1>NOT-YET</h1>
          </div>
          <div className="homepage-topbar-right">
            {/* Toggle profile dropdown on click */}
            <img
              src={prof}
              alt="profile"
              height={35}
              width={35}
              onClick={handleProfileToggle}
            />
          </div>
        </div>

        {/* Side Menu */}
        {isMenuOpen && (
          <div className="homepage-topbar-toggle-sidenav">
            <ul>
              <li>Dashboard</li>
              <li>My Tasks</li>
              <li>Projects</li>
              <li>Meetings</li>
            </ul>
          </div>
        )}

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="profile-dropdown">
            <ul>
              <li>Create New Workspace</li>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        )}

        <div className="homepage-center-page">
          <div
            className={
              isMenuOpen
                ? "homepage-center-page-move"
                : "homepage-center-page-full"
            }
          >
            <div className="homepage-project-header">
              <div className="homepage-project-header-left">
                <h1>Project Title</h1>
                <p>
                  Description of the project goes here. It outlines the purpose,
                  goals, and tasks involved in the project.
                </p>
                <div className="homepage-project-progress">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "0%" }}></div>
                  </div>
                  <span>0% Complete</span>
                </div>
              </div>
              <div className="homepage-project-header-right">
                <div className="homepage-project-header-right-list">
                  <p>Team Members:</p>
                  <div className="team-members">
                    <div className="avatar">A</div>
                    <div className="avatar">B</div>
                    <div className="avatar">C</div>
                  </div>
                </div>
                <button>Invite</button>
              </div>
            </div>
          </div>
          <div className="tasks-bar-menu-bar">
            <BasicTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
