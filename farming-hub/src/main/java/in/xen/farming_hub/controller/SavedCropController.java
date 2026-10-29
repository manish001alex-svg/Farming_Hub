package in.xen.farming_hub.controller;

import in.xen.farming_hub.dto.ApiResponse;
import in.xen.farming_hub.entity.Crop;
import in.xen.farming_hub.entity.SavedCrop;
import in.xen.farming_hub.repository.SavedCropRepository;
import in.xen.farming_hub.service.SavedCropService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/saved-crops")
public class SavedCropController {

    private SavedCropService savedCropService;

    public SavedCropController(SavedCropService savedCropService) {
        this.savedCropService = savedCropService;
    }

    @PostMapping("/{cropId}")
    public ResponseEntity<ApiResponse> savedCrop(@PathVariable Long cropId, Authentication authentication){
        Long id = Long.parseLong(authentication.getName());
        System.out.println(id);

        savedCropService.saveCrop(id, cropId);

        return ResponseEntity
                .status(HttpStatus.CREATED.value())
                .body(
                        new ApiResponse(
                                true,
                                HttpStatus.CREATED.value(),
                                "Crop Saved Successfully",
                                null,
                                Instant.now()
                        )
                );
    }

    @DeleteMapping("/{cropId}")
    public ResponseEntity<ApiResponse> deleteCrop(@PathVariable Long cropId, Authentication authentication){
        Long id = Long.parseLong(authentication.getName());
        System.out.println(id);

        savedCropService.removeSavedCrop(id, cropId);

        return ResponseEntity
                .status(HttpStatus.CREATED.value())
                .body(
                        new ApiResponse(
                                true,
                                HttpStatus.CREATED.value(),
                                "Crop removed Successfully",
                                null,
                                Instant.now()
                        )
                );
    }

    @GetMapping
    public ResponseEntity<?> getAllCrop(Authentication authentication){
        Long id = Long.parseLong(authentication.getName());

        List<SavedCrop> crops = savedCropService.getSavedCrops(id);

        return ResponseEntity
                .status(HttpStatus.OK.value())
                .body(
                        new ApiResponse(
                                true,
                                HttpStatus.OK.value(),
                                "Crop Saved Successfully",
                                crops,
                                Instant.now()
                        )
                );
    }
}
