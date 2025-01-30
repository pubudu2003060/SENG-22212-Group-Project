package com.example.test.service;

import com.example.test.model.Admin;
import com.example.test.repo.AdminRepo;
import io.jsonwebtoken.Claims;
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
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
    private final AdminRepo adminRepo;
    //nota safe way
    private String secretKey = "";

    public JWTService(AdminRepo adminRepo) {
        //generate the key
        try {
            KeyGenerator keyGen=KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk =keyGen.generateKey();
            secretKey=Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        this.adminRepo = adminRepo;
    }

    public String generateToken(String userName) {
        Admin admin = adminRepo.findAdminByUserName(userName);
        String role="USER";//default role

        if(admin != null){
            role="ADMIN";//asign the role based on the admin
        }

        //generate toke for every time that is logging
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("role", role);//include the role in the claim
        return Jwts.builder()
                .setClaims(claims)
                .addClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+60*60*30))//30min expiration
                .signWith(getKey())//to sign in it needs the key
                .compact();

    }
    private SecretKey getKey() {
        //covert the secretKey string into bytes
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);

    }

    public String extractUserName(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
        final Claims claims=extractClaims(token);
        return claimResolver.apply(claims);
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token, UserDetails userDeatils) {
        final String userName=extractUserName(token);
        return (userName.equals(userDeatils.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());

    }
    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }
}
