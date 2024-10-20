package com.example.server.service;

import com.example.server.model.Project;
import com.example.server.model.User;
import com.example.server.repository.ProjectRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    // Method to create a project
    public Project createProject(Long userId, String projectName, String projectDescription) {
        // Find the user by ID
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            // Create and save a new project
            Project project = new Project();
            project.setName(projectName);
            project.setDescription(projectDescription);
            project.setUser(user.get()); // Set the project to the user

            return projectRepository.save(project);
        } else {
            throw new IllegalArgumentException("User with ID " + userId + " not found");
        }
    }

    public List<Project> getProjectsByUserId(Long userId) {
        return projectRepository.findByUserId(userId);
    }

    // In ProjectService
    public Project addMemberToProject(Long projectId, String username) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (projectOptional.isPresent() && userOptional.isPresent()) {
            Project project = projectOptional.get();
            User user = userOptional.get();

            // Add logic here to add the user to the project's member list (if applicable)
            // For example, if you have a list of users in your Project model:
            // project.getMembers().add(user);

            return projectRepository.save(project); // Save the updated project
        } else {
            throw new IllegalArgumentException("Project or User not found");
        }
    }

}
