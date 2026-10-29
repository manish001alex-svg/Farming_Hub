package in.xen.farming_hub.service;

import in.xen.farming_hub.dto.cultivation.CultivationImageRequestDto;
import in.xen.farming_hub.dto.cultivation.CultivationRequestDto;
import in.xen.farming_hub.dto.cultivation.CultivationStepRequestDto;
import in.xen.farming_hub.entity.Crop;
import in.xen.farming_hub.entity.Cultivation;
import in.xen.farming_hub.entity.CultivationStep;
import in.xen.farming_hub.entity.CultivationStepImage;
import in.xen.farming_hub.repository.CropsRepository;
import in.xen.farming_hub.repository.CultivationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CultivationService {
    private final CropsRepository cropsRepository;
    private final CultivationRepository cultivationRepository;

    public CultivationService(CropsRepository cropsRepository, CultivationRepository cultivationRepository) {
        this.cropsRepository = cropsRepository;
        this.cultivationRepository = cultivationRepository;
    }

    @Transactional
    public Cultivation createCultivation(Long cropId, CultivationRequestDto requestDto){
        System.out.println("Step1");
        // 1. Find Crop
        Crop crop = cropsRepository.findById(cropId)
                .orElseThrow(()->
                        new RuntimeException("Crop not found")
                        );

        // 2. Create Cultivation
        Cultivation cultivation = new Cultivation();
        cultivation.setShowing_time(requestDto.getSowingTime());
        cultivation.setGrowing_Duration(requestDto.getGrowingDuration());
        cultivation.setHarvesting_Period(requestDto.getHarvestingPeriod());
        cultivation.setYoutube_url(requestDto.getYoutubeUrl());

        // 3. Connect Cultivation with crops
        cultivation.setCrop(crop);

        System.out.println("Step2");
        // 4. Create Steps
        List<CultivationStep> steps = new ArrayList<>();

        for(CultivationStepRequestDto stepRequest : requestDto.getSteps()){
            CultivationStep step = new CultivationStep();

            step.setStepNumber(stepRequest.getStepNumber());
            step.setTitle(stepRequest.getTitle());
            step.setDescription(stepRequest.getDescription());
            step.setRecommendedPractices(stepRequest.getRecommendedPractices());
            step.setImportantNotes(stepRequest.getImportantNotes());

//            // 5. Create Step Images
//            List<CultivationStepImage> cultivationStepImages = new ArrayList<>();
//
//            for(CultivationImageRequestDto imageRequestDto : stepRequest.getStepImages())
//            {
//                CultivationStepImage cultivationStepImage = new CultivationStepImage();
//
//                cultivationStepImage.setImageUrl(imageRequestDto.getImageUrl());
//                cultivationStepImage.setImgId(imageRequestDto.getImgId());
//
//                // Connect images with setp
//                cultivationStepImage.setStep(step);
//
//                cultivationStepImages.add(cultivationStepImage);
//            }
//
//            //Connect Image with setp
//            step.setImages(cultivationStepImages);

            // Connect step with cultivation
            step.setCultivation(cultivation);

            steps.add(step);
        }

        // Connect steps with cultivation
        cultivation.setSteps(steps);

        // 7. Save
        return cultivationRepository.save(cultivation);
    }

    @Transactional
    public Cultivation getCultivation(Long id){
       Cultivation cultivation = cultivationRepository.findByCropId(id)
               .orElse(null);
       return cultivation;
    }
}
