package com.example.test.controller;

import com.example.test.dto.BQDetailsDTO;
import com.example.test.dto.BuyQuotaDTO;
import com.example.test.model.BuyQuota;
import com.example.test.service.BuyQuotaService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/addbuyquotes")
    public BuyQuota saveBuyQuota(@RequestBody BQDetailsDTO  buyQuotaDTO) {
        return buyQuotaService.saveBQuyQuota(buyQuotaDTO);
    }
}
