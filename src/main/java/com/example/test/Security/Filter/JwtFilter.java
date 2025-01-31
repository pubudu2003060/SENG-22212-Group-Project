package com.example.test.Security.Filter;

import com.example.test.Security.Services.JWTService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Logger;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final ApplicationContext context;


    @Autowired
    @Qualifier("userDetailsServiceImp")
    @Lazy
    private final UserDetailsService userDetailsService;

    private static final Logger logger = Logger.getLogger(JwtFilter.class.getName());


    public JwtFilter(JWTService jwtService, ApplicationContext context, @Lazy @Qualifier("userDetailsServiceImp") UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.context = context;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String identifier = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); // Omit "Bearer " prefix
            identifier = jwtService.extractSubject(token);
        }

        if (identifier != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            String role = jwtService.extractClaims(token, claims -> claims.get("role", String.class));
            UserDetails userDetails = null;

            try {
                if ("ADMIN".equals(role)) {
                    userDetails = context.getBean(UserDetailsService.class)
                            .loadUserByUsername(identifier); // Load admin details
                } else if ("USER".equals(role)) {
                    userDetails = userDetailsService.loadUserByUsername(identifier); // Default user loading
                } else {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid role in token");
                    return;
                }

                if (jwtService.validateToken(token, identifier) && isAuthorizedForEndpoint(request.getRequestURI(), role)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied for requested API");
                    return;
                }

            } catch (Exception e) {
                handleTokenException(response, e);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean isAuthorizedForEndpoint(String requestURI, String role) {
        if (requestURI.startsWith("/api/v1/admin") && "ADMIN".equals(role)) {
            return true;
        }
        if (requestURI.startsWith("/api/v1/user") && "USER".equals(role)) {
            return true;
        }
        return requestURI.startsWith("/api/v1");
    }

    private void handleTokenException(HttpServletResponse response, Exception e) throws IOException {
        if (e instanceof ExpiredJwtException) {
            response.getWriter().write("JWT Token has expired. Please log in again.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        } else if (e instanceof MalformedJwtException || e instanceof SignatureException) {
            response.getWriter().write("Invalid token.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            response.getWriter().write("An error occurred while processing the token.");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
