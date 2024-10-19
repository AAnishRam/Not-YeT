package com.example.server.service;

import com.example.server.model.Project;
import com.example.server.model.User;
import com.example.server.repository.ProjectRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
