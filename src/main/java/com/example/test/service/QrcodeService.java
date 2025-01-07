package com.example.test.service;

import com.example.test.dto.QrcodeDTO;
import com.example.test.model.Qrcode;
import com.example.test.repo.QrcodeRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class QrcodeService {

    @Autowired
    private QrcodeRepo qrcodeRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<QrcodeDTO> getQrcode() {
        List<Qrcode> qrcodeList = qrcodeRepo.findAll();
        List<QrcodeDTO> qrcodeDTOList = new ArrayList<>();
        for(Qrcode qrcode: qrcodeList){
            qrcodeDTOList.add(modelMapper.map(qrcode,QrcodeDTO.class));
        }
        return  qrcodeDTOList;
    }

    public QrcodeDTO addQrcode(QrcodeDTO qrcodeDTO) {
        qrcodeRepo.save(modelMapper.map(qrcodeDTO,Qrcode.class));
        return qrcodeDTO;
    }
}
