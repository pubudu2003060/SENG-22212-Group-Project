package com.example.test.Security.Services;

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
    private final UserRepo userRepo;

        public UserDetailsServiceImp(UserRepo userRepo) {
            this.userRepo = userRepo;
            logger.info("UserDetailsServiceImp Initialized");
        }

        @Override
        public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
            com.example.test.model.User user = userRepo.getUserByContactNo(phoneNumber);
            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }

            // Since there is no password, use an empty string
            return new org.springframework.security.core.userdetails.User(
                    user.getContactNo(),
                    user.getFirstName(), // No password
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
            );
        }
    }



