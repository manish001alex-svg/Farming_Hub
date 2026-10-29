package in.xen.farming_hub.repository;

import in.xen.farming_hub.entity.Crop;
import in.xen.farming_hub.entity.SavedCrop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedCropRepository extends JpaRepository<SavedCrop, Long> {
    boolean existsByUserIdAndCropId(Long userId, Long cropId);
    void deleteByUserIdAndCropId(Long userId, Long cropId);
    List<SavedCrop> findByUserId(Long id);
}
