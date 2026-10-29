package in.xen.farming_hub.dto.cultivation;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class HarvestingRequestDto {
    private String harvestingTime;

    private List<String> maturityIndicators;

    private String harvestingMethod;

    private List<HarvestingStepRequestDto> steps;

    private List<String> postHarvestHandling;

    private String storage;

    private String youtubeUrl;
}
