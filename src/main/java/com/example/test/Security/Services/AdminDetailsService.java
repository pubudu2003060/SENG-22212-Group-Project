package com.example.test.Security.Services;

import com.example.test.model.Admin;
import com.example.test.repo.AdminRepo;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDetailsService implements UserDetailsService {


        private final AdminRepo adminRepo;

        public AdminDetailsService(AdminRepo adminRepo) {
            this.adminRepo = adminRepo;
        }

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            Admin admin = adminRepo.findAdminByUserName(username);

            String role = "ADMIN"; // Static role assignment for now

            // Add custom logic here to fetch roles dynamically if needed

            return new org.springframework.security.core.userdetails.User(
                    admin.getUserName(),
                    admin.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_" + role))
            );
        }


}
