package com.example.test.Security.Services;

import com.example.test.repo.UserLoginRepo;
import com.example.test.repo.UserRepo;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
@Qualifier("userDetailsServiceImp")
public class UserDetailsServiceImp implements UserDetailsService {

    private static final Logger logger= Logger.getLogger(UserDetailsServiceImp.class.getName());
    private final UserLoginRepo userLoginRepoRepo;
    private final UserLoginRepo userLoginRepo;

    public UserDetailsServiceImp(UserRepo userRepo, UserLoginRepo userLoginRepo) {
            this.userLoginRepoRepo = userLoginRepo;
            logger.info("UserDetailsServiceImp Initialized");
        this.userLoginRepo = userLoginRepo;
    }

        @Override
        public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
            com.example.test.model.UserLogin userLogin = userLoginRepo.getUserLoginByPhoneNumber(phoneNumber);
            if (userLogin == null) {
                throw new UsernameNotFoundException("User not found");
            }

            // Since there is no password, use an empty string
            return new org.springframework.security.core.userdetails.User(
                    userLogin.getPhoneNumber(),
                    "", // No password
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
            );
        }
    }



