package in.xen.farming_hub.controller;

import in.xen.farming_hub.dto.ApiResponse;
import in.xen.farming_hub.dto.crops.CropsResponseDto;
import in.xen.farming_hub.dto.crops.NewCropRequestDto;
import in.xen.farming_hub.dto.crops.NewCropResponseDto;
import in.xen.farming_hub.dto.cultivation.CropDetailsResponseDto;
import in.xen.farming_hub.dto.cultivation.CultivationRequestDto;
import in.xen.farming_hub.dto.cultivation.HarvestingRequestDto;
import in.xen.farming_hub.entity.Crop;
import in.xen.farming_hub.entity.Cultivation;
import in.xen.farming_hub.entity.Harvesting;
import in.xen.farming_hub.service.CropService;
import in.xen.farming_hub.service.CultivationService;
import in.xen.farming_hub.service.HarvestingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/crops")
public class CrpoController {

    private CropService cropService;
    private CultivationService cultivationService;
    private HarvestingService harvestingService;

    public CrpoController(CropService cropService, CultivationService cultivationService, HarvestingService harvestingService) {
        this.cropService = cropService;
        this.cultivationService = cultivationService;
        this.harvestingService = harvestingService;
    }

    @PostMapping
    public ResponseEntity<?> createNewCrop(
            @RequestParam("image") List<MultipartFile> images,
            @Valid @RequestPart("crop") NewCropRequestDto requestDto,
            Authentication authentication) throws Exception {


        if (images.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("At least one image is required");
        }

        if (images.size() > 5) {
            return ResponseEntity.badRequest()
                    .body("Maximum 5 images are allowed");
        }

        Crop crop = cropService.createNewCrop(images,requestDto);

        NewCropResponseDto responseDto = new NewCropResponseDto(
                crop.getId(),
                crop.getName(),
                crop.getScientificName(),
                crop.getCategory(),
                crop.getDescription(),
                crop.getOrigin(),
                crop.getSoil(),
                crop.getTemperature(),
                crop.getRainfall(),
                crop.getHumidity(),
                crop.getSunlight(),
                crop.getWaterRequirement(),
                "Crop added successfully"
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse<>(
                        true,
                        HttpStatus.CREATED.value(),
                        "Crop added successfully",
                        requestDto,
                        Instant.now()
                )
        );

    }


    @GetMapping
    public ResponseEntity<?> getAllCrops(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size
    ){
        System.out.println("Page "+page);
        return ResponseEntity.ok(cropService.getAllCrops(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CropDetailsResponseDto>> getCropsById(
            @PathVariable Long id
    )
    {
        Crop crop = cropService.getCropById(id);
        Cultivation cultivation = cultivationService.getCultivation(crop.getId());
        Harvesting harvesting = harvestingService.getHarvesting(crop.getId());
        CropDetailsResponseDto responseDto = new CropDetailsResponseDto(crop, cultivation, harvesting);

//
//        CropsResponseDto responseDto = new CropsResponseDto(
//                crop.getId(),
//                crop.getName(),
//                crop.getScientificName(),
//                crop.getCategory(),
//                crop.getDescription(),
//                crop.getOrigin(),
//                crop.getSoil(),
//                crop.getTemperature(),
//                crop.getRainfall(),
//                crop.getHumidity(),
//                crop.getSunlight(),
//                crop.getWaterRequirement(),
//                crop.getImages(),
//                "Crops fetched successfully"
//        );
//
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse<>(
                        true,
                        HttpStatus.CREATED.value(),
                        "Crops created successfully",
                        responseDto,
                        Instant.now()
                )
        );
    }


    @PostMapping("/{cropId}/cultivation")
    public ResponseEntity<?> createCultivation(
            @PathVariable Long cropId,
            @RequestBody CultivationRequestDto requestDto
            ){

        System.out.println("Hello"+cropId);
        Cultivation cultivation = cultivationService.createCultivation(cropId, requestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED.value())
                .body(
                        cultivation
                );
    }


    @PostMapping("/{cropId}/harvesting")
    public ResponseEntity<?> createHarvesting(
            @PathVariable Long cropId,
            @RequestBody HarvestingRequestDto requestDto
    ){
        System.out.println("ID: "+ cropId);
        Harvesting harvesting = harvestingService.createHarvesting(cropId,requestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED.value())
                .body(
                        harvesting
                );
    }
}
