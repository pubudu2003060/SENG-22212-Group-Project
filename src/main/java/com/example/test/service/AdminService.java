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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AdminService implements UserDetailsService {


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
        String userName = adminSignInDTO.getUserName();
        String password = adminSignInDTO.getPassword();

        Admin admin = adminrepo.getAdminByUserNameAndPassword(userName, password);
        if(admin == null){
            return null;
        }
        return modelMapper.map(admin, AdminDTO.class);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Admin admin=adminrepo.findAdminByUserName(username);
        if(admin==null){
            System.out.println("Admin not found");
            throw new UsernameNotFoundException("admin not found");
        }

    }
}
