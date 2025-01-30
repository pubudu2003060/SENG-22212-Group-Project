package com.example.test.Filter;

import com.example.test.model.UserLogin;
import com.example.test.service.AdminService;
import com.example.test.service.JWTService;
import com.example.test.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component

//For every request in the filterchain this OncePerRequestFilter only once
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    ApplicationContext context;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token=null;
        String identifier=null;

        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            //to ommit fist 6 indexes that belongs to the Bearer,we begin with index 7
            token = authHeader.substring(7);
            identifier=jwtService.extractSubject(token);
        }
        if(identifier !=null && SecurityContextHolder.getContext().getAuthentication()==null) {
            String role=jwtService.extractClaims(token,claims->claims.get("role",String.class));
            //Dynamically load user details
            UserDetails userDetails=null;

            // Load user details dynamically based on the role
            if ("ADMIN".equals(role)) {
                userDetails = context.getBean(AdminService.class).loadUserByUsername(identifier); // Still using username for Admin
            } else if ("USER".equals(role)) {
                userDetails = context.getBean(UserService.class).loadUserByPhoneNumber(identifier); // Using phoneNumber for User
            } else {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid role in token");
                return; // Stop further processing
            }

            //Validate JWT token and check role-based authorization
            if(jwtService.validateToken(token,identifier)&& isAuthorizedForEndpoint(request.getRequestURI(),role)){

                //check API based on role
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    //adding the token in the chain
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                }else{
                    response.sendError(HttpServletResponse.SC_FORBIDDEN,"Access denied for requested API");
                    return;//stop further processing
                }




        }
        filterChain.doFilter(request, response);
    }

    private boolean isAuthorizedForEndpoint(String requestURI, String role) {
        if(requestURI.startsWith("/api/v1/admin") && "ADMIN".equals(role)) {
            return true;
        }
        if(requestURI.startsWith("/api/v1/user") && "USER".equals(role)) {
            return true;
        }
        if(requestURI.startsWith("/api/v1")) {
            return true;
        }
        return false;
    }

}
