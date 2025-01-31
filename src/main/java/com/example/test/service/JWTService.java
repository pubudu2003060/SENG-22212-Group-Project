package com.example.test.service;

import com.example.test.dto.LoginRequestDto;
import com.example.test.model.Admin;
import com.example.test.model.FuelStation;
import com.example.test.model.UserLogin;
import com.example.test.repo.AdminRepo;
import com.example.test.repo.FuelStationRepo;
import com.example.test.repo.UserLoginRepo;
import com.example.test.repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
    private final AdminRepo adminRepo;
    private final UserLoginRepo userLoginRepo;
    private final UserLoginService userLoginService;
    private final FuelStationRepo fuelStationRepo;
    //nota safe way
    private String secretKey = "";

    public JWTService(AdminRepo adminRepo, UserRepo userRepo, UserLoginRepo userLoginRepo, OtpGenerateService otpGenerateService, UserLoginService userLoginService, FuelStationRepo fuelStationRepo) {


        //generate the key
        try {
            KeyGenerator keyGen=KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk =keyGen.generateKey();
            secretKey=Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        this.adminRepo = adminRepo;
        this.userLoginService = userLoginService;
        this.userLoginRepo = userLoginRepo;
        this.fuelStationRepo = fuelStationRepo;

    }

    public String generateAdminToken(String userName) {

        Admin admin = adminRepo.findAdminByUserName(userName);

        if(admin == null){
            throw new RuntimeException("Admin not found");
        }

        //generate toke for every time that is logging
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "ADMIN");//include the role in the
        claims.put("username", userName);

        Date now = new Date();
        Date expirationTime = new Date(now.getTime() + 86400000);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(now)
                .setExpiration(expirationTime)//30min expiration
                .signWith(getKey())//to sign in it needs the key
                .compact();

    }

    public String generateUserToken(String phoneNumber) {

        UserLogin userLogin = userLoginRepo.getUserLoginByPhoneNumber(phoneNumber);

        if(userLogin == null){
            throw new RuntimeException("User not found");
        }

        //generate toke for every time that is logging
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "USER");//include the role in the
        claims.put("phoneNumber", phoneNumber);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(phoneNumber)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+30*60*10000))//30min expiration
                .signWith(getKey())//to sign in it needs the key
                .compact();

    }

    public String generateFuelStationToken(String username) {
        FuelStation fuelStation = fuelStationRepo.findFuelStationByUserName(username);

        if (fuelStation == null) {
            throw new RuntimeException("Fuel Station not found");
        }

        // Generate token for FUELSTATION
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "FUELSTATION");
        claims.put("username", username);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+30*60*10000))
                .signWith(getKey())//to sign in it needs the key
                .compact();



    }

    private SecretKey getKey() {
        //covert the secretKey string into bytes
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);

    }

    public boolean verifyUserOTP(LoginRequestDto loginRequestDto) {
        String validationResponse = userLoginService.validateOtp(loginRequestDto);

        // Interpret the response string and convert it to boolean
        return "OTP verified successfully".equalsIgnoreCase(validationResponse);
    }

    public String extractSubject(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return extractClaims(token, claims -> claims.get("role", String.class));
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
        final Claims claims=extractClaims(token);
        return claimResolver.apply(claims);
    }

    public Claims extractClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .setAllowedClockSkewSeconds(3600)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }
        catch (ExpiredJwtException e) {
            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), "Expired JWT token", e);
        }catch (Exception e) {
            // Handle invalid signature
            throw new RuntimeException("Invalid JWT signature", e);
        }
    }

    public boolean validateToken(String token,String identifier) {
        final String extractedSubject=extractSubject(token);
        return (extractedSubject.equals(identifier) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());

    }
    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }
}
