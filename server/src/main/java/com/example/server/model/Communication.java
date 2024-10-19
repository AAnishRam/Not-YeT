package com.example.server.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "communications")
public class Communication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @OneToMany(mappedBy = "communication", cascade = CascadeType.ALL)
    private Set<Message> messages;

    public Communication() {
    }

    public Communication(Long id, Project project, Set<Message> messages) {
        this.id = id;
        this.project = project;
        this.messages = messages;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

}
