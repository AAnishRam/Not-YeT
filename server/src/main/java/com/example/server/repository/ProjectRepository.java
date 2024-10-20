package com.example.server.repository;

import com.example.server.model.Project;
import com.example.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user); // Find projects by user

    List<Project> findByUserId(Long userId);

}
