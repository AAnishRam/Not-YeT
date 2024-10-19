import React, { useState } from "react";
import "./Overview.css";

const Overview = () => {
  // State management for different sections
  const [description, setDescription] = useState("");
  const [confirmedDescription, setConfirmedDescription] = useState(""); // New state for confirmed description
  const [isEditing, setIsEditing] = useState(true); // Track whether the user is in edit mode
  const [members, setMembers] = useState([
    { name: "Name", role: "Project owner" },
    { name: "Name", role: "Project Member" },
  ]);
  const [status, setStatus] = useState("On track");

  // Event handlers
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleAddMember = () => {
    const newMember = { name: "New Member", role: "Team Member" };
    setMembers([...members, newMember]);
  };

  const handleConfirmDescription = () => {
    setConfirmedDescription(description);
    setIsEditing(false); // Set editing to false after confirming
  };

  const handleEditDescription = () => {
    setDescription(confirmedDescription); // Populate textarea with confirmed description
    setIsEditing(true); // Set editing to true to allow changes
  };

  return (
    <div className="project-overview">
      {/* Main content */}
      <div className="overview-main-content">
        {/* Project Description */}
        <div className="overview-description">
          <h3 className="description-title">Project description</h3>
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
          {isEditing ? (
            <button onClick={handleConfirmDescription}>Confirm</button>
          ) : (
            <button onClick={handleEditDescription}>Edit</button>
          )}
        </div>

        {/* Project Roles */}
        <div className="overview-roles">
          <h3 className="roles-title">Project roles</h3>
          {members.map((member, index) => (
            <div key={index} className="role-item">
              <span className="role-member-name">{member.name}</span> -{" "}
              {member.role}
            </div>
          ))}
          <button className="add-member-button" onClick={handleAddMember}>
            Add member
          </button>
        </div>
      </div>

      {/* Status Sidebar */}
      <div className="status-sidebar">
        <h3 className="status-title">What's the status?</h3>
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
