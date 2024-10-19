package com.example.server.controller;

import com.example.server.model.User;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class SignInController {

    @Autowired
    private UserService userService;

    // Endpoint for handling sign-in
    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody User user) {
        // Validate user credentials
        Optional<User> existingUser = userService.getUser(user.getEmail(), user.getPassword());

        if (existingUser.isPresent()) {
            // If user exists, sign-in is successful
            return ResponseEntity.ok("Login successful");
        } else {
            // If credentials are invalid, return an error
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
