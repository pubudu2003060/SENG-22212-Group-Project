package com.example.test.Filter;

import com.example.test.service.AdminService;
import com.example.test.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token=null;
        String username=null;

        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            //to ommit fist 6 indexes that belongs to the Bearer,we begin with index 7
            token = authHeader.substring(7);
            username=jwtService.extractUserName(token);
        }
        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
            UserDetails userDeatils=context.getBean(AdminService.class).loadUserByUsername(username);

            if(jwtService.validateToken(token,userDeatils)){
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDeatils, null, userDeatils.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                //adding the token in the chain
                SecurityContextHolder.getContext().setAuthentication(authToken);



            }
        }
        filterChain.doFilter(request, response);
    }
}
