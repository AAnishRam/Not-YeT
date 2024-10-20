package com.example.server.controller;

import com.example.server.model.User;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SignUpController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/signup")
    public ResponseEntity<User> create(@RequestBody User user) {
        User obj = userService.createUser(user);
        return new ResponseEntity<>(obj, HttpStatus.CREATED);
    }
}
