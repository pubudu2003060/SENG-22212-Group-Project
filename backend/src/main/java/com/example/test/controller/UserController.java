package com.example.test.controller;

import com.example.test.dto.UserDto;
import com.example.test.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/admin/getusers")
    public List<UserDto> getUser() {
        return userService.getAllUsers();
    }

    @PostMapping("/user/adduser")
    public UserDto saveUser(@RequestBody UserDto userDTO) {
        return userService.saveUser(userDTO);
    }

}
