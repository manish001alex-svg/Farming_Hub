package in.xen.farming_hub.repository;

import in.xen.farming_hub.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropsRepository extends JpaRepository<Crop, Long> {

}
