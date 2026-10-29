package in.xen.farming_hub.dto.crops;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewCropResponseDto {
    private Long id;
    private String name;
    private String scientificName;
    private String category;
    private String description;
    private String origin;
    private String soil;
    private String temperature;
    private String rainfall;
    private String humidity;
    private String sunlight;
    private String waterRequirement;
    private String message;
}
