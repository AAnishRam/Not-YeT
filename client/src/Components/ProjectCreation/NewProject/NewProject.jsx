// import React, { useEffect, useState } from "react";
// import "./NewProject.css"; // Custom CSS for styling
// import lottie from "lottie-web"; // Import Lottie for rendering animation
// import { CircularProgress } from "@mui/material"; // To show loading indicator
// import axios from "axios"; // Import Axios for HTTP requests
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// const NewProject = () => {
//   const [projectName, setProjectName] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Initialize Lottie animation on component mount
//     lottie.loadAnimation({
//       container: document.getElementById("lottie-background"),
//       renderer: "svg",
//       loop: true,
//       autoplay: true,
//       path: "https://lottie.host/60dd280f-7130-45a6-bceb-e86bd1d8802e/7xkf87qro3.json", // Lottie animation path
//     });
//   }, []);

//   const handleCreateProject = async () => {
//     if (!projectName) {
//       setError(true);
//     } else {
//       setError(false);
//       setLoading(true);

//       try {
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const userId = userDetails?.id;

//         const projectData = {
//           projectName,
//           projectDescription,
//           userId,
//         };

//         const response = await axios.post(
//           "http://localhost:8080/api/projects/create",
//           projectData
//         );

//         console.log("Project created successfully:", response.data);
//         navigate("/");
//       } catch (error) {
//         console.error(
//           "Error creating project:",
//           error.response?.data || error.message
//         );
//         setApiError("Failed to create project. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="newProjectPage">
//       {/* Background Lottie container */}
//       <div id="lottie-background"></div>

//       {/* Right side: Form */}
//       <div className="newProjectContainer">
//         <h1 className="newProjectTitle">New Project</h1>

//         <div className="newProjectInputGroup">
//           <label htmlFor="projectName" className="newProjectLabel">
//             Project Name
//           </label>
//           <input
//             type="text"
//             id="projectName"
//             className="newProjectInput"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//           />
//           {error && (
//             <span className="newProjectErrorMessage">
//               Project name is required.
//             </span>
//           )}
//         </div>

//         <div className="newProjectInputGroup">
//           <label htmlFor="projectDescription" className="newProjectLabel">
//             Project Description
//           </label>
//           <textarea
//             id="projectDescription"
//             className="newProjectTextarea"
//             value={projectDescription}
//             onChange={(e) => setProjectDescription(e.target.value)}
//           />
//         </div>

//         <button
//           onClick={handleCreateProject}
//           className="newProjectCreateBtn"
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={20} /> : "Create Project"}
//         </button>
//         {apiError && <span className="newProjectErrorMessage">{apiError}</span>}
//       </div>
//     </div>
//   );
// };

// export default NewProject;

import React, { useEffect, useState } from "react";
import "./NewProject.css";
import { CircularProgress } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web"; // Import Lottie for rendering animation

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_GEMINI_API;

  useEffect(() => {
    // Initialize Lottie animation on component mount
    lottie.loadAnimation({
      container: document.getElementById("lottie-background"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/60dd280f-7130-45a6-bceb-e86bd1d8802e/7xkf87qro3.json", // Lottie animation path
    });
  }, []);

  if (!API_KEY) {
    console.error("API key is not defined");
    return <div>Error: API key is missing.</div>;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userId = userDetails.id;

  const handleCreateProject = async () => {
    if (!projectName) {
      setError(true);
    } else {
      setError(false);
      setLoading(true);

      try {
        const projectData = {
          projectName,
          projectDescription,
          userId,
        };

        console.log("Project data:", projectData);

        const response = await axios.post(
          "http://localhost:8080/api/projects/create",
          projectData
        );

        console.log("Project created successfully:", response.data);

        navigate("/projectHome");
      } catch (error) {
        console.error(
          "Error creating project:",
          error.response?.data || error.message
        );
        setApiError("Failed to create project. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGenerateDescription = async () => {
    if (!projectName) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);
    setApiError("");

    try {
      const prompt = `Generate a project description for a project named strictly less than 200 characters give description alone no need of heading"${projectName}"`;
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      console.log("API Response:", result);

      setProjectDescription(response);
    } catch (error) {
      console.error("Error generating project description:", error);
      setApiError("Failed to generate project description. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newProjectPage">
      <div id="lottie-background"></div>
      <div className="newProjectContainer">
        {/* Background Lottie container */}

        <h1 className="newProjectTitle">Create a New Project</h1>
        {/* Project Name Input */}
        <div className="newProjectInputGroup">
          <label htmlFor="projectName" className="newProjectLabel">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            className="newProjectInput"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
          />
          {error && (
            <span className="newProjectErrorMessage">
              Project name is required.
            </span>
          )}
        </div>
        {/* Generate Description Button */}
        <div className="newProjectInputGroup">
          <label htmlFor="projectDescription" className="newProjectLabel">
            Project Description
          </label>
          <textarea
            id="projectDescription"
            className="newProjectTextarea"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            disabled={loading}
            placeholder="Enter or generate project description"
          />
          <button
            onClick={handleGenerateDescription}
            className={`newProjectGenerateBtn ${
              loading || !projectName ? "disabled" : ""
            }`}
            disabled={loading || !projectName}
          >
            {loading ? <CircularProgress size={20} /> : "Generate Description"}
          </button>
          {apiError && (
            <span className="newProjectErrorMessage">{apiError}</span>
          )}
        </div>
        {/* Create Project Button */}
        <button
          onClick={handleCreateProject}
          className={`newProjectCreateBtn ${loading ? "disabled" : ""}`}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Create Project"}
        </button>
      </div>
    </div>
  );
};

export default NewProject;
