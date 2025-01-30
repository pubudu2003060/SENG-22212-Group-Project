package com.example.test.service;

import com.example.test.repo.QrcodeRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ScanDetailsService {
    @Autowired
    private QrcodeRepo qrcodeRepo;

    @Autowired
    private ModelMapper modelMapper;

    //public String allocateFuel(ScannedDetailsDTO scannedDetailsDTO) {
        //Qrcode qrCode= qrcodeRepo.findById(scannedDetailsDTO.get);
    //}

}
