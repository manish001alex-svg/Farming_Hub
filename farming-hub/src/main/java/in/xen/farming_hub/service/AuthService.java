package in.xen.farming_hub.service;

import in.xen.farming_hub.dto.*;
import in.xen.farming_hub.entity.User;
import in.xen.farming_hub.enums.Role;
import in.xen.farming_hub.exception.UserNotFoundException;
import in.xen.farming_hub.repository.UserRepository;
import in.xen.farming_hub.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    private JwtService jwtService;
    private AuthenticationManager authenticationManager;


    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AdminRegisterResponseDto adminRegister(AdminRegisterRequestDto adminRegisterRequestDto){

        User user = new User();
        user.setName(adminRegisterRequestDto.getName());
        user.setEmail(adminRegisterRequestDto.getEmail());

        String encodedPassword = passwordEncoder.encode(adminRegisterRequestDto.getPassword());
        user.setPassword(encodedPassword);
        user.setRole(Role.ADMIN);

        userRepository.save(user);

        AdminRegisterResponseDto responseDto = new AdminRegisterResponseDto();
        responseDto.setName(user.getName());
        responseDto.setMessage("User Register Successfully");

        return responseDto;
    }

    public AdminRegisterResponseDto userRegister(AdminRegisterRequestDto adminRegisterRequestDto){

        User user = new User();
        user.setName(adminRegisterRequestDto.getName());
        user.setEmail(adminRegisterRequestDto.getEmail());

        String encodedPassword = passwordEncoder.encode(adminRegisterRequestDto.getPassword());
        user.setPassword(encodedPassword);
        user.setRole(Role.USER);

        userRepository.save(user);

        AdminRegisterResponseDto responseDto = new AdminRegisterResponseDto();
        responseDto.setName(user.getName());
        responseDto.setMessage("User Register Successfully");

        return responseDto;
    }

    public AdminLoginResponseDto loginUser(AdminLoginRequestDto requestDto){

        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(
                    requestDto.getEmail(),
                    requestDto.getPassword()
                );

        Authentication authentication =
                authenticationManager.authenticate(authenticationRequest);


        String token = jwtService.generateToken(authentication);

        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(()-> new UserNotFoundException("User not found"));

        AdminLoginResponseDto responseDto = new AdminLoginResponseDto();
        responseDto.setEmail(user.getEmail());
        responseDto.setToken(token);
        responseDto.setRole(user.getRole());
        responseDto.setMessage("User Logged in with email: "+ requestDto.getEmail());

        return responseDto;
    }

    public MeResponseDto me(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found")
                );

        MeResponseDto responseDto = new MeResponseDto();

        responseDto.setName(user.getName());
        responseDto.setEmail(user.getEmail());
        responseDto.setRole(user.getRole().toString());
        responseDto.setCreatedAt(user.getCreatedAt());
        responseDto.setUpdatedAt(user.getUpdatedAt());

        return responseDto;
    }


}
