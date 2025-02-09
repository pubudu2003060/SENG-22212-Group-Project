package com.example.test.Security.Services;

import com.example.test.dto.LoginRequestDto;
import com.example.test.model.Admin;
import com.example.test.model.FuelStation;
import com.example.test.model.UserLogin;
import com.example.test.repo.AdminRepo;
import com.example.test.repo.FuelStationRepo;
import com.example.test.repo.UserLoginRepo;
import com.example.test.service.UserLoginService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
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
    private final String secretKey;
    private final FuelStationRepo fuelStationRepo;

    // Constructor injection to avoid circular dependencies
    public JWTService(AdminRepo adminRepo,
                      UserLoginRepo userLoginRepo,
                      UserLoginService userLoginService, FuelStationRepo fuelStationRepo) {

        this.adminRepo = adminRepo;
        this.userLoginRepo = userLoginRepo;
        this.userLoginService = userLoginService;

        // Initialize secretKey once during the service construction
        this.secretKey = generateSecretKey();
        this.fuelStationRepo = fuelStationRepo;
    }

    private String generateSecretKey() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            return Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating secret key", e);
        }
    }

    // Method to generate admin token
    public String generateAdminToken(String email) {
        Admin admin = adminRepo.findAdminByEmail(email);
        if (admin == null) {
            throw new RuntimeException("Admin not found");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "ADMIN");
        claims.put("email", email);

        Date now = new Date();
        Date expirationTime = new Date(now.getTime() + 86400000); // 1 day expiration

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expirationTime)
                .signWith(getKey())
                .compact();
    }

    // Method to generate user token
    public String generateUserToken(String phoneNumber) {
        UserLogin userLogin = userLoginRepo.getUserLoginByPhoneNumber(phoneNumber);
        if (userLogin == null) {
            throw new RuntimeException("User not found");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "USER");
        claims.put("phoneNumber", phoneNumber);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(phoneNumber)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 30 * 60 * 10000)) // 30 min expiration
                .signWith(getKey())
                .compact();


    }
    public String generateFuelStationToken(int registeredId) {
        FuelStation fuelStation= fuelStationRepo.findFuelStationByRegisteredId(registeredId);
        if (fuelStation== null) {
            throw new RuntimeException("fuelstation not found");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "FUELSTATION");
        claims.put("username", registeredId);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(registeredId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 30 * 60 * 10000)) // 30 min expiration
                .signWith(getKey())
                .compact();
    }

    // Private method to retrieve the key for signing tokens
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // OTP Verification method
    public boolean verifyUserOTP(LoginRequestDto loginRequestDto) {
        String validationResponse = userLoginService.validateOtp(loginRequestDto);
        return "OTP verified successfully".equalsIgnoreCase(validationResponse);
    }

    // Extract the subject (username or phone number) from the token
    public String extractSubject(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    // Extract the role from the token
    public String extractRole(String token) {
        return extractClaims(token, claims -> claims.get("role", String.class));
    }

    // Extract specific claims from the token
    public <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
        Claims claims = extractClaims(token);
        return claimResolver.apply(claims);
    }

    // Parse and validate claims from the JWT token
    public Claims extractClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .setAllowedClockSkewSeconds(3600) // Allow a 1-hour clock skew
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), "Expired JWT token", e);
        } catch (Exception e) {
            System.out.println("Invalid JWT signature"+e.getMessage());
            throw new RuntimeException("Invalid JWT signature", e);
        }
    }

    // Validate the token using the subject and expiration date
    public boolean validateToken(String token, String identifier) {
        String extractedSubject = extractSubject(token);
        return extractedSubject.equals(identifier) && !isTokenExpired(token);
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from the token
    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }
}
