import "./ProjectCreation.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import pc3 from "../../assets/Images/sp3.jpg";
import sp2 from "../../assets/Images/sp2.jpg";
import add from "../../assets/Images/add.jpg";

const ProjectCreation = () => {
  const navi = useNavigate();
  const toProjectCreateHome = () => {
    navi("/newProject");
  };

  return (
    <div className="tot-project-creation-page">
      <div className="tot-project-creation-header">
        <h1>Create a New Project</h1>
        <h2>How would you like to start?</h2>
      </div>
      <div className="project-creation-body">
        <div className="project-creation-boxes-container">
          <div className="project-creation-boxes" onClick={toProjectCreateHome}>
            <div className="project-creation-inside-box">
              <img src={add} alt="Add" height={50} width={50} />
            </div>
            <div className="project-creation-description">
              <h4>Blank Project</h4>
              <p>Start from Scratch</p>
            </div>
          </div>

          <div className="project-creation-boxes">
            <div className="project-creation-inside-box">
              <img src={sp2} alt="Template 1" height={50} width={50} />
            </div>
            <div className="project-creation-description">
              <h4>Template Project</h4>
              <p>Use a Predefined Template</p>
            </div>
          </div>

          <div className="project-creation-boxes">
            <div className="project-creation-inside-box">
              <img src={pc3} alt="Template 2" height={50} width={50} />
            </div>
            <div className="project-creation-description">
              <h4>Import Project</h4>
              <p>Import from Existing File</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreation;
