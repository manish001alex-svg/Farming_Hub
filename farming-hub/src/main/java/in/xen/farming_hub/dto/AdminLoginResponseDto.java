package in.xen.farming_hub.dto;

import in.xen.farming_hub.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminLoginResponseDto {
    String email;
    String token;
    String message;
    Role role;
}
