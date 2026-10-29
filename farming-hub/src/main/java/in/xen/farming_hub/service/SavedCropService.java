package in.xen.farming_hub.service;

import in.xen.farming_hub.entity.Crop;
import in.xen.farming_hub.entity.SavedCrop;
import in.xen.farming_hub.entity.User;
import in.xen.farming_hub.exception.CropsNotFoundException;
import in.xen.farming_hub.exception.UserNotFoundException;
import in.xen.farming_hub.repository.CropsRepository;
import in.xen.farming_hub.repository.SavedCropRepository;
import in.xen.farming_hub.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedCropService {
    private  final SavedCropRepository savedCropRepository;
    private final CropsRepository cropsRepository;
    private final UserRepository userRepository;

    public SavedCropService(SavedCropRepository savedCropRepository, CropsRepository cropsRepository, UserRepository userRepository) {
        this.savedCropRepository = savedCropRepository;
        this.cropsRepository = cropsRepository;
        this.userRepository = userRepository;
    }

    public void saveCrop(Long userId, Long cropId){

        // 1. Check user exist or not
        User user = userRepository.findById(userId)
                .orElseThrow(()->
                        new UserNotFoundException("User not exist with Id: "+userId)
                );

        // 2. Whether crop exist or not
        Crop crop = cropsRepository.findById(cropId)
                .orElseThrow(()->
                        new CropsNotFoundException("Crop not exist with this email: "+cropId)
                );

        // 3. Prevent Duplicate Save
        if(savedCropRepository.existsByUserIdAndCropId(userId, cropId)){
            throw new RuntimeException("Crop already saved");
        }

        // 4. Create Relationship
        SavedCrop savedCrop = new SavedCrop();
        savedCrop.setUser(user);
        savedCrop.setCrop(crop);

        // 5. Saved Relationship
        savedCropRepository.save(savedCrop);
    }

    @Transactional
    public void removeSavedCrop(Long userId, Long cropId) {

        if (!savedCropRepository.existsByUserIdAndCropId(userId, cropId)) {
            throw new RuntimeException("Crop is not saved");
        }

        savedCropRepository.deleteByUserIdAndCropId(userId, cropId);
    }

    public List<SavedCrop> getSavedCrops(Long userId) {
        return savedCropRepository.findByUserId(userId);
    }
}
