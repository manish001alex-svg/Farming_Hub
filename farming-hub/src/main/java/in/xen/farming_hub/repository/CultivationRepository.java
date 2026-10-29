package in.xen.farming_hub.repository;

import in.xen.farming_hub.entity.Cultivation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CultivationRepository extends JpaRepository<Cultivation, Long> {
    Optional<Cultivation> findByCropId(Long cropId);

}
