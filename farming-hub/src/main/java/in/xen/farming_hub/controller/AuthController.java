package in.xen.farming_hub.controller;

import in.xen.farming_hub.dto.*;
import in.xen.farming_hub.entity.User;
import in.xen.farming_hub.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.Instant;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    // Register new user as Admin
    @PostMapping("/admin/register")
    public ResponseEntity<ApiResponse<AdminRegisterResponseDto>> registerAdminUser(@Valid @RequestBody AdminRegisterRequestDto requestDto){

        AdminRegisterResponseDto responseDto = authService.adminRegister(requestDto);

        ApiResponse<AdminRegisterResponseDto> response =
                new ApiResponse<>(
                        true,
                        201,
                        "Admin register successful.",
                        responseDto,
                        Instant.now()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // Register new user as User
    @PostMapping("/user/register")
    public ResponseEntity<ApiResponse<AdminRegisterResponseDto>> registerUser(@Valid @RequestBody AdminRegisterRequestDto requestDto){

        AdminRegisterResponseDto responseDto = authService.userRegister(requestDto);

        ApiResponse<AdminRegisterResponseDto> response =
                new ApiResponse<>(
                        true,
                        201,
                        "Admin register successful.",
                        responseDto,
                        Instant.now()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }



    // Login flow and set cookie to client
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AdminLoginResponseDto>> login(@Valid @RequestBody AdminLoginRequestDto requestDto, HttpServletResponse response){

        AdminLoginResponseDto responseDto = authService.loginUser(requestDto);

        // Create cookie object
        ResponseCookie cookie = ResponseCookie.from("access_token", responseDto.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofHours(1))
                .sameSite("Lax")
                .build();

        // Add Cookie to client
        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookie.toString()
        );


        // Sending response to client
        ApiResponse<AdminLoginResponseDto> responseX =
                new ApiResponse<>(
                    true,
                    HttpStatus.OK.value(),
                    "Admin Logged in",
                    responseDto,
                    Instant.now()
                );


        return ResponseEntity.ok(responseX);
    }


    @GetMapping("/me")
    ResponseEntity<ApiResponse<MeResponseDto>> meController(Authentication authentication){
       MeResponseDto user = authService.me(Long.parseLong(authentication.getName()));

        ApiResponse<MeResponseDto> response = new ApiResponse<>(
                true,
                HttpStatus.OK.value(),
                "User fetched successfully!",
                user
                ,Instant.now()

        );

        return ResponseEntity.ok(response);
    }
}
