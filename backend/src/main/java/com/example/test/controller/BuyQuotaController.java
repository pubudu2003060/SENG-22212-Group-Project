package com.example.test.controller;

import com.example.test.dto.BQDetailsDTO;
import com.example.test.dto.BuyQuotaDTO;
import com.example.test.model.BuyQuota;
import com.example.test.service.BuyQuotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class BuyQuotaController {

    @Autowired
    private BuyQuotaService buyQuotaService;

    @GetMapping("/admin/getbuyquotes")
    public List<BuyQuotaDTO> getAllBuyQuota() {
        return buyQuotaService.getAllbuyquota();
    }

    @PostMapping("/fuelstation/addbuyquotes")
    public ResponseEntity<Object> saveBuyQuota(@RequestBody BQDetailsDTO  buyQuotaDTO) {
        try {
            return ResponseEntity.ok().body(buyQuotaService.saveBQuyQuota(buyQuotaDTO));
        }catch(Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong");
        }
    }
}
