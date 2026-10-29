package in.xen.farming_hub.dto.cultivation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HarvestingStepRequestDto {
    private Integer stepNumber;
    private String title;
    private String description;
}
