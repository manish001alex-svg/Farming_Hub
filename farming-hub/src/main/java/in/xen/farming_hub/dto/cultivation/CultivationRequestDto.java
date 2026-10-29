package in.xen.farming_hub.dto.cultivation;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class CultivationRequestDto {

        private String sowingTime;

        private String growingDuration;

        private String harvestingPeriod;

        private String youtubeUrl;

        private List<CultivationStepRequestDto> steps;

}
