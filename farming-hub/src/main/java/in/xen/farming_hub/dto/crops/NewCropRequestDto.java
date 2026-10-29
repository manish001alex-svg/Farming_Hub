package in.xen.farming_hub.dto.crops;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewCropRequestDto {

    @NotBlank(message = "Crop name is required")
    @Size(max = 100, message = "Crop name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Scientific name is required")
    @Size(max = 150, message = "Scientific name must not exceed 150 characters")
    private String scientificName;

    @NotBlank(message = "Category is required")
    @Size(max = 100, message = "Category must not exceed 100 characters")
    private String category;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Origin is required")
    @Size(max = 150, message = "Origin must not exceed 150 characters")
    private String origin;

    @NotBlank(message = "Soil is required")
    private String soil;

    @NotBlank(message = "Temperature is required")
    private String temperature;

    @NotBlank(message = "Rainfall is required")
    private String rainfall;

    @NotBlank(message = "Humidity is required")
    private String humidity;

    @NotBlank(message = "Sunlight is required")
    private String sunlight;

    @NotBlank(message = "Water requirement is required")
    private String waterRequirement;
}