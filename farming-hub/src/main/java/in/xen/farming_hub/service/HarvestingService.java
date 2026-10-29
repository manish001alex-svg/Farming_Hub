package in.xen.farming_hub.service;

import in.xen.farming_hub.dto.cultivation.HarvestingRequestDto;
import in.xen.farming_hub.dto.cultivation.HarvestingStepRequestDto;
import in.xen.farming_hub.entity.Crop;
import in.xen.farming_hub.entity.Harvesting;
import in.xen.farming_hub.entity.HarvestingStep;
import in.xen.farming_hub.repository.CropsRepository;
import in.xen.farming_hub.repository.HarvestingRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HarvestingService {
    private final CropsRepository cropsRepository;
    private final HarvestingRepository harvestingRepository;

    public HarvestingService(CropsRepository cropsRepository, HarvestingRepository harvestingRepository) {
        this.cropsRepository = cropsRepository;
        this.harvestingRepository = harvestingRepository;
    }


    @Transactional
    public Harvesting createHarvesting(Long cropId, HarvestingRequestDto harvestingRequestDto){
        System.out.println("Step1");

        //1 Find Crops
        Crop crop = cropsRepository.findById(cropId)
                .orElseThrow(()->
                            new RuntimeException("Crop Not Found")
                        );

        //2 Create Harvesting
        Harvesting harvesting = new Harvesting();
        harvesting.setHarvestingTime(harvestingRequestDto.getHarvestingTime());
        harvesting.setMaturityIndicators(harvestingRequestDto.getMaturityIndicators());
        harvesting.setHarvestingMethod(harvestingRequestDto.getHarvestingMethod());
        harvesting.setPostHarvestHandling(harvestingRequestDto.getPostHarvestHandling());
        harvesting.setStorage(harvestingRequestDto.getStorage());
        harvesting.setYoutubeUrl(harvestingRequestDto.getYoutubeUrl());

        //3 Connect Harvesting with crops
        harvesting.setCrop(crop);

        System.out.println("Step2");
        //4 Create Steps
        List<HarvestingStep> steps = new ArrayList<>();

        for(HarvestingStepRequestDto stepRequest: harvestingRequestDto.getSteps()){
            HarvestingStep harvestingStep = new HarvestingStep();

            System.out.println(stepRequest.getDescription());

            harvestingStep.setStepNumber(stepRequest.getStepNumber());
            harvestingStep.setTitle(stepRequest.getTitle());
            harvestingStep.setDescription(stepRequest.getDescription());

            // Connect Step with harvesting
            harvestingStep.setHarvesting(harvesting);

            steps.add(harvestingStep);
        }

        //5 Save
        harvesting.setSteps(steps);

        return harvestingRepository.save(harvesting);
    }

    @Transactional
    public Harvesting getHarvesting(Long id){
        Harvesting harvesting = harvestingRepository.findByCropId(id)
                .orElse(null);

        return  harvesting;
    }
}
