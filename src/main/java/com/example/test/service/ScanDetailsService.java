package com.example.test.service;

import com.example.test.dto.scannedDetailsDTO;
import com.example.test.model.Qrcode;
import com.example.test.repo.ScanDetailsRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ScanDetailsService {
    @Autowired
    private ScanDetailsRepo scanDetailsRepo;

    @Autowired
    private ModelMapper modelMapper;

    public scannedDetailsDTO getScannedDetails() {
        Qrcode qrcodeDetails = ScanDetailsRepo.findByQrCodeId(QrCodeid);
        return modelMapper.map(Qrcode,scannedDetailsDTO.class);
    }
}
