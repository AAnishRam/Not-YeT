package com.example.server.controller;

import com.example.server.model.Project;
import com.example.server.service.ProjectService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Endpoint to create a new project
    @PostMapping("/create")
    public ResponseEntity<Project> createProject(@RequestBody ProjectRequest projectRequest) {
        try {
            Project createdProject = projectService.createProject(
                    projectRequest.getUserId(),
                    projectRequest.getProjectName(),
                    projectRequest.getProjectDescription());
            return ResponseEntity.ok(createdProject);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Return error if user not found
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Project>> getProjectsByUserId(@PathVariable("userId") Long userId) {
        List<Project> projects = projectService.getProjectsByUserId(userId);
        if (projects.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no projects
        }
        return ResponseEntity.ok(projects); // Return the list of projects
    }

    // In ProjectController
    @PostMapping("/{projectId}/add-member")
    public ResponseEntity<Project> addMemberToProject(@PathVariable Long projectId,
            @RequestBody Map<String, String> request) {
        String username = request.get("username");
        try {
            Project updatedProject = projectService.addMemberToProject(projectId, username);
            return ResponseEntity.ok(updatedProject);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // Handle errors accordingly
        }
    }

}

// Request body class to hold project creation details
class ProjectRequest {
    private Long userId;
    private String projectName;
    private String projectDescription;

    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }
}
