package com.example.server.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL)
    private Communication communication;

    // Other fields like team members, tasks, files, etc.

    // Getters and Setters
}
