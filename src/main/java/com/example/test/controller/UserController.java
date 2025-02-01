package com.example.test.controller;

import com.example.test.dto.UserDto;
import com.example.test.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getusers")
    public List<UserDto> getUser() {
        return userService.getAllUsers();
    }

    @PostMapping("/adduser")
    public UserDto saveUser(@RequestBody UserDto userDTO) {
        return userService.saveUser(userDTO);

    }
    //If we try to get the scrf token in the logout page review.
    // Although we try to add that value in the postman it dont work
    //As postman use another use not the same user in the browser,So it fail.
    //So had to get a csrf token using api get method
    @GetMapping("/getCsrf-token")
    public CsrfToken getCsrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute("_csrf");
    }

}
