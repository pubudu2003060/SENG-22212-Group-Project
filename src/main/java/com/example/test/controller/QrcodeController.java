package com.example.test.controller;

import com.example.test.dto.QrcodeDTO;
import com.example.test.service.QrcodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class QrcodeController {

    @Autowired
    private QrcodeService qrcodeService;

    @PostMapping("/addqrcode")
    public QrcodeDTO addQrcode(@RequestBody QrcodeDTO qrcodeDTO) {
        return qrcodeService.addQrcode(qrcodeDTO);
    }

    @GetMapping("/getqrcodes")
    public List<QrcodeDTO> getQrcodes() {
        return qrcodeService.getQrcode();

    }

    @GetMapping("/{id}")
    public QrcodeDTO getQrcodeDetailsById(@PathVariable int id) {
        return qrcodeService.getQrCodeDetailsById(id);
    }
}
