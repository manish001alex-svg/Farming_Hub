package in.xen.farming_hub.dto.cultivation;

import in.xen.farming_hub.entity.Crop;
import in.xen.farming_hub.entity.Cultivation;
import in.xen.farming_hub.entity.Harvesting;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CropDetailsResponseDto {
    private Crop crop;
    private Cultivation cultivation;
    private Harvesting harvesting;
}
