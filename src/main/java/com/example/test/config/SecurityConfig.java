package com.example.test.config;

import com.example.test.Filter.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity//this says don't go with the default way.Just go with the way I provide
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
      return http
        .csrf(customizer->customizer.disable())
        .authorizeHttpRequests(request ->request

                //the URL s inside the requestmatcher should not authenticated
                .requestMatchers("api/v1/adminsignin","api/v1/addadmin")
                .permitAll()
                .anyRequest().authenticated()) //By this no one can access the page without authentication
        .formLogin(Customizer.withDefaults()) // this says for form login just go with the default way.otherwise although we give the login details it do not work

        .httpBasic(Customizer.withDefaults()) // to check with the postman we want to give this line to give the rest api access.otherwise it show a html code
        .sessionManagement(session->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // without doing this we can access to login form  using browser bcz for every request it needs the credentials
              .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
      .build();

      //but in the above method when we refresh it create a new session id.So in everytime we have to sign in
      // csrf is important for put,post,get methods.For get basic auth is enough.But if we try a post method using basic auth it gives 401 error
      // this build gives a object of security filter chain


        }
//        @Bean
//    public UserDetailsService userDetailsService() {
//      //indirectly Inmemmory is implementing user details service.Directly we cant return userDetails service
//            //as it want to create interface then the steps we want to follow might be long
//
//            UserDetails user1= User
//                    .withDefaultPasswordEncoder()
//                    .username("rashmika")
//                    .password("rash")
//                    .roles("FUELSTATION")
//                    .build();
//
//            UserDetails user2= User
//                    .withDefaultPasswordEncoder()
//                    .username("sarala")
//                    .password("salan")
//                    .roles("ADMIN")
//                    .build();
//      return  new InMemoryUserDetailsManager(user1, user2);
//
//      //if we run at this stage it will not allow us to access the page.As now it is not working with the default way.
//            // It behaves in the way we provided
//
//
//        }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
      //when validating the password we want to again bcrypt.If not when the user log with their username and password,
        //The user password with compare with th hash value.So they are not match.So bcrypt again
      authProvider.setPasswordEncoder(new BCryptPasswordEncoder(12));
      authProvider.setUserDetailsService(userDetailsService);
      return authProvider;

    }

    @Bean
    //auth manager talk to auth provider
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


}
