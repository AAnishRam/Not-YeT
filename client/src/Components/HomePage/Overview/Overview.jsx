import React, { useState, useEffect } from "react";
import "./Overview.css";
import axios from "axios"; // Import axios for API requests

const Overview = ({ selectedProject }) => {
  // State management for different sections
  const [description, setDescription] = useState("");
  const [confirmedDescription, setConfirmedDescription] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("On track");
  const [allUsers, setAllUsers] = useState([]); // State to hold all users
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Get selected project from local storage

  useEffect(() => {
    if (selectedProject) {
      // Set description and members from selected project
      setDescription(selectedProject.description);
      setConfirmedDescription(selectedProject.description);
      // Fetch existing members (this might come from your project data)
      setMembers(selectedProject.members || []); // Assuming members are part of project
    }

    // Fetch all users for the search
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users"); // Adjust the endpoint
        setAllUsers(response.data); // Assuming this returns a list of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Fetch users on component mount
  }, [selectedProject]);

  // Event handlers
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleAddMember = async (username) => {
    const newMember = { username }; // Adjust based on your member structure
    setMembers([...members, newMember]);

    try {
      // Send request to backend to add the member to the project
      await axios.post(
        `http://localhost:8080/api/projects/${selectedProject.id}/add-member`,
        { username }
      );
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleConfirmDescription = () => {
    setConfirmedDescription(description);
    setIsEditing(false);
  };

  const handleEditDescription = () => {
    setDescription(confirmedDescription);
    setIsEditing(true);
  };

  return (
    <div className="project-overview">
      {/* Main content */}
      <div className="overview-main-content">
        {/* Project Description */}
        <div className="overview-description">
          <h3 className="description-title">Project Description</h3>
          {isEditing ? (
            <textarea
              className="description-input"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="What's this project about?"
            ></textarea>
          ) : (
            <p className="description-output">{confirmedDescription}</p>
          )}
          <button
            onClick={
              isEditing ? handleConfirmDescription : handleEditDescription
            }
            className="action-button"
          >
            {isEditing ? "Confirm" : "Edit"}
          </button>
        </div>

        {/* Project Roles */}
        <div className="overview-roles">
          <h3 className="roles-title">Project Roles</h3>
          {members.map((member, index) => (
            <div key={index} className="role-item">
              <span className="role-member-name">{member.username}</span> -{" "}
              {member.role || "Team Member"}
            </div>
          ))}
        </div>

        {/* User Search Bar */}
        <div className="user-search">
          <input
            type="text"
            placeholder="Search for a user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-results">
            {allUsers
              .filter((user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <div
                  key={user.id}
                  className="search-result"
                  onClick={() => handleAddMember(user.username)}
                >
                  {user.username}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Status Sidebar */}
      <div className="status-sidebar">
        <h3 className="status-title">What's the Status?</h3>
        <div className="status-buttons">
          <button
            className={`status-button ${status === "On track" ? "active" : ""}`}
            onClick={() => handleStatusChange("On track")}
          >
            On track
          </button>
          <button
            className={`status-button ${status === "At risk" ? "active" : ""}`}
            onClick={() => handleStatusChange("At risk")}
          >
            At risk
          </button>
          <button
            className={`status-button ${
              status === "Off track" ? "active" : ""
            }`}
            onClick={() => handleStatusChange("Off track")}
          >
            Off track
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
