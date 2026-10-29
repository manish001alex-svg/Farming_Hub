package in.xen.farming_hub.dto.cultivation;

import in.xen.farming_hub.entity.CultivationStep;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CultivationImageRequestDto {
    CultivationStep cultivationStep;
    String imageUrl;
    String imgId;
}
