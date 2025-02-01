package com.example.test.service;

import com.example.test.model.Qrcode;
import com.example.test.repo.QrcodeRepo;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

@Service
@Transactional
public class QrcodeGeneraterService {

    @Autowired
    QrcodeRepo qrcodeRepo;

    public byte[] generateQrCode(int vehicalId) {
        Qrcode qrcode = qrcodeRepo.getQrcodeByCustomerFualQuata_Vehical_VehicalId(vehicalId);
        String Text = qrcode.getContent();
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(Text, BarcodeFormat.QR_CODE,250,250);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            try {
                MatrixToImageWriter.writeToStream(bitMatrix, "png", byteArrayOutputStream);
                return byteArrayOutputStream.toByteArray();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } catch (WriterException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateQRCodeImage(int vehicalId) {
        Qrcode qrcode = qrcodeRepo.getQrcodeByCustomerFualQuata_Vehical_VehicalId(vehicalId);
        String Text = qrcode.getContent();
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = null;
        try {
            bitMatrix = qrCodeWriter.encode(Text, BarcodeFormat.QR_CODE, 250, 250);

            String userHome = System.getProperty("user.home");
            Path path = FileSystems.getDefault().getPath(userHome + "/Downloads/qrcode_" + vehicalId + ".png");
            try {
                MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
                return path.toAbsolutePath().toString();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } catch (WriterException e) {
            throw new RuntimeException(e);
        }



    }

}
