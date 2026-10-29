package in.xen.farming_hub.config;

import in.xen.farming_hub.dto.ApiErrorResponse;
import in.xen.farming_hub.security.CustomUserDetailService;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import tools.jackson.databind.ObjectMapper;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Configuration
public class SecurityConfig {


    // Return PasswordEncoder object
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // Request goes to first DaoAuthenticationProvider its work is to pass request to AuthenticationManager
    @Bean
    public DaoAuthenticationProvider authenticationProvider(
            CustomUserDetailService userDetailService,
            PasswordEncoder passwordEncoder
    ){

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailService);
        provider.setPasswordEncoder(passwordEncoder);

        return provider;
    }


    @Bean
    public AuthenticationManager authenticationManager(
            DaoAuthenticationProvider authenticationProvider
    ){
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
        HttpSecurity httpSecurity,
        JwtAuthenticationConverter jwtAuthenticationConverter,
        ObjectMapper objectMapper
    ){

        httpSecurity.csrf(csrf -> csrf.disable())
                .cors(cors -> {})           // Enabling Cors
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/admin/register",
                                "/api/auth/login",
                                "/api/auth/user/register"
                        )
                        .permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/crops")
                        .authenticated()

                        // Get crops can be public
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/crops",
                                "/api/crops/**"
                        ).permitAll()

                        .anyRequest()
                        .authenticated()
                )
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(
                                authenticationEntryPoint(objectMapper)
                        )
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        ))
                .oauth2ResourceServer(oath2 ->
                        oath2
                                .bearerTokenResolver(bearerTokenResolver())         // This will tell the spring to get token form cookies not Authentication
                                .authenticationEntryPoint(
                                        authenticationEntryPoint(objectMapper)
                                )
                                .jwt(jwt ->
                                jwt.jwtAuthenticationConverter(
                                        jwtAuthenticationConverter
                                )
                        )
                );

        return httpSecurity.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter(){
        JwtGrantedAuthoritiesConverter authoritiesConverter = new JwtGrantedAuthoritiesConverter();

        authoritiesConverter.setAuthoritiesClaimName(
                "authorities"
        );
        authoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter authenticationConverter = new JwtAuthenticationConverter();
        authenticationConverter.setJwtGrantedAuthoritiesConverter(
                authoritiesConverter
        );

        return authenticationConverter;

    }


    @Bean
    public SecretKey jwtSecretKey(@Value("${jwt.secret}") String secret){

        byte[] decodedKey = Base64.getDecoder().decode(secret);

        return new SecretKeySpec(
                decodedKey, "HmacSHA256"
        );
    }


    @Bean
    public JwtEncoder jwtEncoder(SecretKey secretKey){
        return NimbusJwtEncoder
                .withSecretKey(secretKey)
                .algorithm(MacAlgorithm.HS256)
                .build();
    }

    @Bean
    public JwtDecoder jwtDecoder(SecretKey secretKey, @Value("${jwt.issuer}") String issuer){
        NimbusJwtDecoder decoder = NimbusJwtDecoder
                .withSecretKey(secretKey)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();

        decoder.setJwtValidator(
                JwtValidators.createDefaultWithIssuer(
                        issuer
                )
        );

        return decoder;
    }


    /*
        Ye Spring Boot ko batata hai ki kaunse frontend se, kaunse HTTP methods ke
        through, aur kaunse headers ke saath tumhare backend ko request karne ki permission hai.
        Is code ko yaad rakhne ka easiest way:
            Origin = Kaun request kar sakta hai?
            Methods = Kya kar sakta hai?
            Headers = Kya information bhej sakta hai?
            Credentials = Cookies/auth credentials bhej sakta hai ya nahi?

            So CorsConfigurationSource basically backend ka CORS permission rulebook hai.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }


    // Telling the Spring security to get token using form cookies
    @Bean
    public BearerTokenResolver bearerTokenResolver() {

        return request -> {

            // Don't read token for public url
            String path = request.getRequestURI();

            if (
                    path.equals("/api/auth/login")
                    || path.equals("/api/auth/admin/register")
                    || path.equals("/api/auth/user/register")
                    || path.equals("/api/crops")
            ) {
                return null;
            }

            Cookie[] cookies = request.getCookies();

            if (cookies == null) {
                return null;
            }

            for (Cookie cookie : cookies) {

                if ("access_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }

            return null;
        };

    }




    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint(
            ObjectMapper objectMapper
    ) {

        return (request, response, authException) -> {

            String message = "Invalid token";
            String errorCode = "INVALID_TOKEN";

            Throwable cause = authException;

            while (cause != null) {

                if (cause instanceof JwtValidationException jwtException) {

                    boolean expired = jwtException.getErrors()
                            .stream()
                            .anyMatch(error ->
                                    error.getDescription()
                                            .toLowerCase()
                                            .contains("expired")
                            );

                    if (expired) {
                        message = "Token expired";
                        errorCode = "TOKEN_EXPIRED";
                    }

                    break;
                }

                cause = cause.getCause();
            }

            ApiErrorResponse<?> errorResponse =
                    new ApiErrorResponse<>(
                            false,
                            HttpStatus.UNAUTHORIZED.value(),
                            message,
                            Map.of(
                                    "authentication",
                                    errorCode
                            ),
                            Instant.now()
                    );

            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");

            objectMapper.writeValue(
                    response.getOutputStream(),
                    errorResponse
            );
        };
    }

}
