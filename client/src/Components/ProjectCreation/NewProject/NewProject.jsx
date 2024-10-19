import React, { useState } from "react";
import "./NewProject.css"; // Custom CSS for styling

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleCreateProject = () => {
    if (!projectName) {
      setError(true);
    } else {
      setError(false);
      console.log("Project Created:", { projectName, projectDescription });
      // Further project creation logic here...
    }
  };

  const handleGenerateDescription = async () => {
    if (!projectName) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    const API_KEY = import.meta.env.VITE_GEMINI_API;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=" +
          API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: {
              text: `Generate a project description for a project named "${projectName}"`,
            },
          }),
        }
      );

      const data = await response.json(); // Extract response body

      if (!response.ok) {
        console.error("API Error Details:", data); // Log the error details from the API
        throw new Error("Failed to fetch description from API");
      }

      setProjectDescription(data.candidates[0].output); // Set the generated description
    } catch (error) {
      console.error("Error generating project description:", error);
    } finally {
      setLoading(false); // Stop loading once the fetch is complete
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
          disabled={loading} // Disable textarea when loading
        />
        <button
          onClick={handleGenerateDescription}
          className="newProjectGenerateBtn"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Generating..." : "Generate project description"}
        </button>
      </div>

      {/* Create Project Button */}
      <button
        onClick={handleCreateProject}
        className="newProjectCreateBtn"
        disabled={loading} // Disable button when loading
      >
        Create Project
      </button>
    </div>
  );
};

export default NewProject;
