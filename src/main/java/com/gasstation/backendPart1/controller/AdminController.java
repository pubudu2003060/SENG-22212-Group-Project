package com.gasstation.backendPart1.controller;

import com.gasstation.backendPart1.dataTransferObject.AminDTO;
import com.gasstation.backendPart1.dataTransferObject.StationDTO;
import com.gasstation.backendPart1.service.AdminService;
import com.gasstation.backendPart1.service.fuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1/")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/getadmins")
    public List<AminDTO> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @PostMapping("/addadmin")
    public AminDTO saveAdmin(@RequestBody AminDTO aminDTO) {
        return adminService.saveAdmins(aminDTO);
    }

    @PutMapping("/updateadmin")
    public AminDTO updateAdmin(@RequestBody AminDTO aminDTO) {
        return adminService.updateAdmin(aminDTO);
    }

    @DeleteMapping("/deleteadmin/{adminId}")
    public String deleteAdmin(@PathVariable Integer adminId) {
        return adminService.deleteAdmin(adminId);
    }

}
