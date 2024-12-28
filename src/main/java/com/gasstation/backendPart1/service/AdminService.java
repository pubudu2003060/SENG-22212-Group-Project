package com.gasstation.backendPart1.service;


import com.gasstation.backendPart1.dataTransferObject.AminDTO;
import com.gasstation.backendPart1.model.Admin;
import com.gasstation.backendPart1.repo.AdminRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional

public class AdminService {
    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<AminDTO> getAllAdmins() {
        List<Admin> adminsList = adminRepo.findAll();
        return modelMapper.map(adminsList, new TypeToken<List<AminDTO>>() {
        }.getType());
    }

    public AminDTO saveAdmins(AminDTO aminDTO) {
        adminRepo.save(modelMapper.map(aminDTO, Admin.class));
        return aminDTO;
    }

    public AminDTO updateAdmin(AminDTO aminDTO) {
        adminRepo.save(modelMapper.map(aminDTO, Admin.class));
        return aminDTO;
    }

    public String deleteAdmin(Integer adminId) {
        adminRepo.deleteById(adminId);
        return "Deleted admin successfully";
    }
}
