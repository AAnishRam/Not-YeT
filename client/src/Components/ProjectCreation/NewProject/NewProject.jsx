import React, { useState } from "react";
import "./NewProject.css"; // Custom CSS for styling
import { CircularProgress } from "@mui/material"; // To show loading indicator
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios"; // Import Axios for HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [apiError, setApiError] = useState(""); // New state for API errors

  const navigate = useNavigate(); // Initialize navigate hook

  const API_KEY = import.meta.env.VITE_GEMINI_API; // Load your API key

  if (!API_KEY) {
    console.error("API key is not defined");
    return <div>Error: API key is missing.</div>;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Fetch userId from local storage
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userId = userDetails?.id; // Adjust 'id' if needed based on your response structure

  const handleCreateProject = async () => {
    if (!projectName) {
      setError(true);
    } else {
      setError(false);
      setLoading(true); // Set loading state to true

      try {
        // Prepare the data for the backend
        const projectData = {
          projectName,
          projectDescription,
          userId, // Send userId along with project data
        };

        console.log("Project data:", projectData);

        // Send a POST request to your backend to create the project
        const response = await axios.post(
          "http://localhost:8080/api/projects/create",
          projectData
        );

        console.log("Project created successfully:", response.data);

        // Redirect to "/" path after successful project creation
        navigate("/");
      } catch (error) {
        console.error(
          "Error creating project:",
          error.response?.data || error.message
        );
        setApiError("Failed to create project. Please try again.");
      } finally {
        setLoading(false); // Stop loading
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
    setApiError(""); // Reset API error message

    try {
      const prompt = `Generate a project description for a project named strictly less than 200 characters give description alone no need of heading"${projectName}"`;
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      console.log("API Response:", result); // Log the entire response

      setProjectDescription(response);
    } catch (error) {
      console.error("Error generating project description:", error);
      setApiError("Failed to generate project description. Please try again."); // Improved error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newProjectContainer">
      <h1 className="newProjectTitle">New Project</h1>

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
          style={{
            height: "100px", // Set your desired height
            overflow: "hidden", // Hide scrollbars
            resize: "none", // Disable resizing
          }}
        />
        <button
          onClick={handleGenerateDescription}
          className="newProjectGenerateBtn"
          disabled={loading || !projectName} // Disable button when loading or if no projectName
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            "Generate project description"
          )}
        </button>
        {apiError && <span className="newProjectErrorMessage">{apiError}</span>}{" "}
        {/* Show API error message */}
      </div>

      {/* Create Project Button */}
      <button
        onClick={handleCreateProject}
        className="newProjectCreateBtn"
        disabled={loading} // Disable button when loading
      >
        {loading ? <CircularProgress size={20} /> : "Create Project"}
      </button>
    </div>
  );
};

export default NewProject;
