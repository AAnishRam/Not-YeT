import React, { useState } from "react";
import "./Overview.css";

const Overview = () => {
  // State management for different sections
  const [description, setDescription] = useState("");
  const [confirmedDescription, setConfirmedDescription] = useState("");
  const [isEditing, setIsEditing] = useState(true);
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
          <button onClick={isEditing ? handleConfirmDescription : handleEditDescription} className="action-button">
            {isEditing ? "Confirm" : "Edit"}
          </button>
        </div>

        {/* Project Roles */}
        <div className="overview-roles">
          <h3 className="roles-title">Project Roles</h3>
          {members.map((member, index) => (
            <div key={index} className="role-item">
              <span className="role-member-name">{member.name}</span> - {member.role}
            </div>
          ))}
          <button className="add-member-button" onClick={handleAddMember}>
            Add Member
          </button>
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
            className={`status-button ${status === "Off track" ? "active" : ""}`}
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
