package in.xen.farming_hub.dto.cultivation;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CultivationStepRequestDto {

        private Integer stepNumber;

        private String title;

        private String description;

        private List<String> recommendedPractices;

        private String importantNotes;

//        private List<CultivationImageRequestDto> stepImages;
}
