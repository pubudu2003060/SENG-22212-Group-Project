package com.example.test.service;

import com.example.test.Security.Services.JWTService;
import com.example.test.dto.FuelStationDTO;
import com.example.test.dto.FuelStationManagementDTO;
import com.example.test.dto.VehicleMockDataDTO;
import com.example.test.enump.Status;
import com.example.test.model.*;
import com.example.test.repo.FuelStationRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FuelStationService {

    @Autowired
    private FuelStationRepo fuelStationRepo;
    @Autowired
    private FuelStationOwnerService fuelStationOwnerService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    //not to create object immediately as started,just create only when it is needed
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public List<FuelStationManagementDTO> getAllFuelStations() {
        List<FuelStation> fuelStationList = fuelStationRepo.findAll();
        return modelMapper.map(fuelStationList, new TypeToken<List<FuelStationManagementDTO>>() {
        }.getType());
    }

    public FuelStationManagementDTO updateFuelStationStatus(Integer id, Status newStatus) {
        FuelStation fuelStation = fuelStationRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Station not found with ID:" + id));
        fuelStation.setStatus(newStatus);
        fuelStationRepo.save(fuelStation);
        return modelMapper.map(fuelStation, FuelStationManagementDTO.class);
    }

    public List<FuelStationManagementDTO> filterStationByStatus(Status status) {
        List<FuelStation> fuelStationList = fuelStationRepo.findByStatus(status);
        return modelMapper.map(fuelStationList, new TypeToken<List<FuelStationManagementDTO>>() {
        }.getType());
    }

    public FuelStationManagementDTO getFuelStationDetails(Integer id) {
        FuelStation fuelStation = fuelStationRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Station not found with ID:" + id));
        return modelMapper.map(fuelStation, FuelStationManagementDTO.class);
    }

    public FuelStationManagementDTO searchFuelStationByID(Integer id) {
        FuelStation fuelStation = fuelStationRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Station not found with ID:" + id));
        return modelMapper.map(fuelStation, FuelStationManagementDTO.class);
    }

    private List<FuelStationDTO> loadMockData() {
        ObjectMapper objectMapper = new ObjectMapper();

        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("mock_fuelStation.json")) {
            if (inputStream == null) {
                throw new RuntimeException("Mock vehicle data file not found!");
            }

            // Read JSON into List of VehicleMockDataDTO
            List<FuelStationDTO> mockDataList = objectMapper.readValue(
                    inputStream, new TypeReference<List<FuelStationDTO>>() {
                    }
            );

            // Convert to DTO using ModelMapper (Optional)
            return mockDataList.stream()
                    .map(fuelstation -> modelMapper.map(fuelstation, FuelStationDTO.class))
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new RuntimeException("Error reading mock vehicle data"+ e.getMessage());
        }
    }

    public FuelStationDTO addFuelStation(FuelStationDTO fuelStationDTO) {
        try {

            List<FuelStationDTO> mockStations = loadMockData();

            // Check if the new vehicle exists in mock data
            boolean isDuplicate = mockStations.stream().anyMatch(mockStation ->
                    mockStation.getStationType().equals(fuelStationDTO.getStationType()) &&
                            mockStation.getRegisteredId() == (fuelStationDTO.getRegisteredId()) &&
                            mockStation.getFuelType().equals(fuelStationDTO.getFuelType())

            );

            if (!isDuplicate) {
                throw new RuntimeException("Fuel Station do not exists!");
            }

            fuelStationDTO.setPassword(encoder.encode(fuelStationDTO.getPassword()));
            FuelStation fuelStation = fuelStationRepo.save(modelMapper.map(fuelStationDTO, FuelStation.class));
            return modelMapper.map(fuelStation, FuelStationDTO.class);


        } catch (Exception e) {
            throw new DuplicateKeyException("Error while adding FuelStation: " + e.getMessage());
        }
    }

    public ResponseEntity<String> loginFuelStation(int registerdId, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            registerdId,
                            password,
                            Collections.singletonList(new SimpleGrantedAuthority("FUELSTATION"))
                    )
            );

            if (authentication.isAuthenticated()) {
                return ResponseEntity.ok().body(jwtService.generateFuelStationToken(registerdId));
            } else {
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
        } catch (AuthenticationException e) {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login fail" + e.getMessage());
        }
    }


    public Long getTotalActiveStations() {
        return fuelStationRepo.getTotalActiveStations();
    }

    public List<FuelStationDTO> findFuelStationsCapacityBelow8000() {
        List<FuelStation> lowFuelStationList = fuelStationRepo.findStationsWithCapacityBelow8000();
        return modelMapper.map(lowFuelStationList, new TypeToken<List<FuelStationDTO>>() {
        }.getType());
    }

}
