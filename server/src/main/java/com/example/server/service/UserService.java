package com.example.server.service;

import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Get user by email and password (sign-in)
    public Optional<User> getUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
