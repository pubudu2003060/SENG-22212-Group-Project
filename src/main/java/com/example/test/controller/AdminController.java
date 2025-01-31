package com.example.test.controller;

import com.example.test.dto.AdminDTO;
import com.example.test.dto.ChangeAdminPasswordDTO;
import com.example.test.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/getadmin")
    public List<AdminDTO> getAllAdmins() {
        return adminService.getAllAdmin();
    }

    @PostMapping("/addadmin")
    public AdminDTO saveAdmin(@RequestBody AdminDTO adminDTO) {
        return adminService.saveAdmin(adminDTO);
    }

    @PutMapping("/update-password/{adminId}")
    public String updatePassword(@PathVariable int adminId, @RequestBody ChangeAdminPasswordDTO changeAdminPasswordDTO) {
        try {
            adminService.updatePassword(adminId, changeAdminPasswordDTO.getNewPassword());
            return "Password updated successfully!";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
