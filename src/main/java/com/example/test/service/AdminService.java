package com.example.test.service;

import com.example.test.dto.AdminDTO;
import com.example.test.dto.AdminSignInDTO;
import com.example.test.dto.BuyQuotaDTO;
import com.example.test.model.Admin;
import com.example.test.model.BuyQuota;
import com.example.test.repo.AdminRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminService {

    @Autowired
    private AdminRepo adminrepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<AdminDTO> getAllAdmin() {
        List<Admin> adminList = adminrepo.findAll();
        return modelMapper.map(adminList, new TypeToken<List<AdminDTO>>() {
        }.getType());
    }

    public AdminDTO saveAdmin(AdminDTO adminDTO) {
        adminrepo.save(modelMapper.map(adminDTO, Admin.class));
        return adminDTO;
    }

    public AdminDTO getAdminByUserNameAndPassword(AdminSignInDTO adminSignInDTO){
        String email = adminSignInDTO.getEmail();
        String password = adminSignInDTO.getPassword();

        Admin admin = adminrepo.getAdminByEmailAndPassword(email, password);
        if(admin == null){
            return null;
        }
        return modelMapper.map(admin, AdminDTO.class);
    }

    public Admin updatePassword(int adminId, String newPassword) throws Exception {
        Optional<Admin> optionalAdmin = adminrepo.findById(adminId);

        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();

            // Check if new password is the same as the existing password
            if (admin.getPassword().matches(newPassword)) {
                throw new Exception("New password cannot be the same as the old password.");
            }

            admin.setPassword(newPassword); // Encrypt new password
            return adminrepo.save(admin);
        } else {
            throw new Exception("Admin not found.");
        }
    }
}
