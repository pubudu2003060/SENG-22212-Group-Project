package com.example.test.Security.Services;

import com.example.test.repo.UserRepo;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

        private final UserRepo userRepo;

        public UserDetailsServiceImp(UserRepo userRepo) {
            this.userRepo = userRepo;
        }

        @Override
        public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
            User user = userRepo.getUserByContactNo(phoneNumber);

            // Since there is no password, use an empty string
            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    "", // No password
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
            );
        }
    }


}
