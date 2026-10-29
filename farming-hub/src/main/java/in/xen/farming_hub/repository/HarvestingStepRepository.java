package in.xen.farming_hub.repository;

import in.xen.farming_hub.entity.HarvestingStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HarvestingStepRepository extends JpaRepository<HarvestingStep, Long> {
}
