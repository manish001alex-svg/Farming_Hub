package in.xen.farming_hub.dto.crops;

import in.xen.farming_hub.entity.CropImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CropsResponseDto {
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
    private List<CropImage> images = new ArrayList<>();
    private String message;
}
