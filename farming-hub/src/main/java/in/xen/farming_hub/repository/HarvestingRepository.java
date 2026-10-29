package in.xen.farming_hub.repository;

import in.xen.farming_hub.entity.Harvesting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HarvestingRepository extends JpaRepository<Harvesting, Long> {
    Optional<Harvesting> findByCropId(Long cropId);
}
