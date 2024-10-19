package com.example.server.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // This will map to a "users" table in SQL
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the user ID
    private Long id;

    @Column(nullable = false, unique = true) // Email should be unique
    private String email;

    @Column(nullable = false, unique = true) // Username should be unique
    private String username;

    @Column(nullable = false) // Password is required
    private String password;

    // Default constructor
    public User() {
    }

    // Constructor with fields
    public User(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
