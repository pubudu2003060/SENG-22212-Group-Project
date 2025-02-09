package com.example.test.service;

import com.example.test.Security.Services.JWTService;
import com.example.test.dto.AdminDTO;
import com.example.test.dto.AdminSignInDTO;
import com.example.test.model.Admin;
import com.example.test.Security.principals.AdminPrincipal;
import com.example.test.repo.AdminRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

@Transactional
public class AdminService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private AdminRepo adminrepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private ModelMapper modelMapper;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public List<AdminDTO> getAllAdmin() {
        List<Admin> adminList = adminrepo.findAll();
        return modelMapper.map(adminList, new TypeToken<List<AdminDTO>>() {
        }.getType());
    }

    public AdminDTO saveAdmin(AdminDTO adminDTO) {
        adminDTO.setPassword(encoder.encode(adminDTO.getPassword()));
        adminrepo.save(modelMapper.map(adminDTO, Admin.class));
        return adminDTO;
    }

    public AdminDTO getAdminByUserNameAndPassword(AdminSignInDTO adminSignInDTO){
        String userName = adminSignInDTO.getUserName();
        String password = adminSignInDTO.getPassword();

        Admin admin = adminrepo.getAdminByUserNameAndPassword(userName, password);
        if(admin == null){
            return null;
        }
        return modelMapper.map(admin, AdminDTO.class);
    }


    public Admin updatePassword(String email, String newPassword) throws Exception {
        Admin optionalAdmin = adminrepo.findAdminByEmail(email);

        if (optionalAdmin != null) {
            Admin admin = optionalAdmin;

            // Check if new password is the same as the existing password
            if (admin.getPassword().equals(newPassword)) {
                throw new Exception("New password cannot be the same as the old password.");
            }else {
                admin.setPassword(encoder.encode(newPassword)); // Encrypt new password
                return adminrepo.save(admin);
            }


        } else {
            throw new Exception("Admin not found.");
        }
    }

}
