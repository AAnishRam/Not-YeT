import React, { useState, useEffect } from "react";
import "./HomePage.css";
import menuIcon from "../../assets/Images/menu.png";
import profileIcon from "../../assets/Images/profile.png";
import BasicTabs from "./TasksBar/TasksBar"; // Assuming this handles task tabs
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For API requests

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [projects, setProjects] = useState([]); // State to store the projects
  const [selectedProject, setSelectedProject] = useState(null); // State to store selected project
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  const navi = useNavigate();

  // Fetch userId from localStorage
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userId = userDetails?.id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Fetch projects for the user from the backend
        const response = await axios.get(
          `http://localhost:8080/api/projects/user/${userId}`
        );
        setProjects(response.data); // Set the projects state with the fetched data
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects.");
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleProfileToggle = () => setIsProfileOpen(!isProfileOpen);

  const handleSubmit = () => {
    navi("/feedback");
  };

  const naviProject = () => {
    navi("/projectCreation");
  };

  const toProject = () => {
    navi("/projectHome");
  };
  const toComingSoon = () => {
    navi("/comingsoon");
  };

  // Handle project selection and store in local storage
  const handleProjectSelection = (project) => {
    setSelectedProject(project); // Store the selected project
    localStorage.setItem("selectedProject", JSON.stringify(project)); // Save project details in localStorage
    console.log(selectedProject);
  };

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
            <li onClick={toComingSoon}>Dashboard</li>
            <li onClick={toComingSoon}>My Tasks</li>
            <li onClick={toProject}>Projects</li>
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
          {loading ? (
            <p>Loading projects...</p>
          ) : error ? (
            <p>{error}</p>
          ) : projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <div className="project-cards">
              {projects.map((project) => (
                <div
                  className={`project-card ${
                    selectedProject && selectedProject.id === project.id
                      ? "selected"
                      : ""
                  }`}
                  key={project.id}
                  onClick={() => handleProjectSelection(project)} // Handle project click
                >
                  <h2>{project.name}</h2>
                  <p>{project.description || "No description provided"}</p>
                  <div className="project-progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${project.progress || 0}%` }}
                    ></div>
                  </div>
                  <span>{project.progress || 0}% Complete</span>
                </div>
              ))}
            </div>
          )}

          {/* Task Tabs */}
          <div className="tasks-tabs">
            <BasicTabs selectedProject={selectedProject} />{" "}
            {/* Pass selectedProject */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
