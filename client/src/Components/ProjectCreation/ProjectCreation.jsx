import React from "react";
import add from "../../assets/Images/add.png";
import pc2 from "../../assets/Images/pc2.svg";
import pc3 from "../../assets/Images/pc3.svg";
import "./ProjectCreation.css";
import { useNavigate } from "react-router-dom";

const ProjectCreation = () => {
  const navi = useNavigate();
  const toProjectCreateHome =() =>{
    navi("/newProject");
  }
  return (
    <div>
      <div className="tot-project-creation-page">
        <div className="tot-project-creation-header">
          <h1>Create a new project</h1>
          <h2>How would you like to start?</h2>
        </div>
        <div className="project-creation-body">
          <div className="project-creation-boxes-container">
            <div className="project-creation-boxes" onClick={toProjectCreateHome}>
              <div className="project-creation-inside-box">
                <img src={add} alt="" height={25} width={25}/>
              </div>
              <div className="project-creation-description">
                <h4>Blank Project</h4>
                <p>Start from Scratch</p>
              </div>
            </div>
            <div className="project-creation-boxes">
              <div className="project-creation-inside-box">
                <img src={pc2} alt="" height={25} width={25}/>
              </div>
              <div className="project-creation-description">
                <h4>Blank Project</h4>
                <p>Start from Scratch</p>
              </div>
            </div>
            <div className="project-creation-boxes">
              <div className="project-creation-inside-box">
                <img src={pc3} alt="" height={25} width={25}/>
              </div>
              <div className="project-creation-description">
                <h4>Blank Project</h4>
                <p>Start from Scratch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreation;
