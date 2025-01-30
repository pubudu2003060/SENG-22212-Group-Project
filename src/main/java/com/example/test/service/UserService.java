package com.example.test.service;

import com.example.test.dto.UserDto;
import com.example.test.model.*;
import com.example.test.repo.UserLoginRepo;
import com.example.test.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserLoginRepo userLoginRepo;

    public List<UserDto> getAllUsers() {
        List<User> userList = userRepo.findAll();
        return modelMapper.map(userList, new TypeToken<List<UserDto>>() {
        }.getType());

    }

    public UserDto saveUser(UserDto userDTO) {
        User user = userRepo.save(modelMapper.map(userDTO, User.class));
        return modelMapper.map(user, UserDto.class);
    }

    public Object updateUser(UserDto userDTO) {
        Optional<User> user = userRepo.findById(userDTO.getUserId());
        if (user.isPresent()) {
            userRepo.save(modelMapper.map(userDTO, User.class));
            return userDTO;
        }
        else{
            return "user doesnt exist";
        }
    }

    public UserDto getUserByPhoneNumber(String phoneNumber){
        User user = userRepo.getUserByContactNo(phoneNumber);
        if(user != null){
            return modelMapper.map(user,UserDto.class);
        }
        else{
            return null;
        }

    }
    public UserDetails loadUserByPhoneNumber(String phoneNumber) {
        UserLogin userLogin = userLoginRepo.getUserLoginByPhoneNumber(phoneNumber);
        if (userLogin == null) {
            throw new UsernameNotFoundException("User not found with phone number: " + phoneNumber);
        }
        UserPrincipal userPrincipal = new UserPrincipal(userLogin);
        return userPrincipal; // Return UserPrincipal
    }





}
