package in.xen.farming_hub.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminRegisterRequestDto {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 character")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email addresses")
    @Size(max = 150, message = "Email must not exceed 150 character")
    private String email;

    @Size(min = 8, max = 72, message = "Password must be between 8 and 72 character")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).+$",
            message = "Password must contain an uppercase letter, lowercase letter, number, and special character"
    )
    private String password;

}
