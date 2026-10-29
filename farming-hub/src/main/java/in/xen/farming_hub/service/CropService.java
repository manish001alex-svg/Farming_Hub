package in.xen.farming_hub.service;

import in.xen.farming_hub.dto.crops.NewCropRequestDto;
import in.xen.farming_hub.dto.crops.PageResponseDto;
import in.xen.farming_hub.entity.Crop;
import in.xen.farming_hub.entity.CropImage;
import in.xen.farming_hub.exception.CropsNotFoundException;
import in.xen.farming_hub.repository.CropsRepository;
import io.imagekit.models.files.FileUploadResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class CropService {

    private ImageKitService imageKitService;
    private CropsRepository cropsRepository;

    public CropService(ImageKitService imageKitService, CropsRepository cropsRepository) {
        this.imageKitService = imageKitService;
        this.cropsRepository = cropsRepository;
    }

    public Crop createNewCrop(List<MultipartFile> images, NewCropRequestDto requestDto) throws Exception {

        if(images == null || images.isEmpty()){
            throw new IllegalArgumentException("At least one image is required");
        }

        if (images.size() > 5) {
            throw new IllegalArgumentException(
                    "A crop can have a maximum of 5 images"
            );
        }

        Crop crop = new Crop();

        crop.setName(requestDto.getName());
        crop.setScientificName(requestDto.getScientificName());
        crop.setCategory(requestDto.getCategory());
        crop.setDescription(requestDto.getDescription());
        crop.setOrigin(requestDto.getOrigin());
        crop.setSoil(requestDto.getSoil());
        crop.setTemperature(requestDto.getTemperature());
        crop.setRainfall(requestDto.getRainfall());
        crop.setHumidity(requestDto.getHumidity());
        crop.setSunlight(requestDto.getSunlight());
        crop.setWaterRequirement(requestDto.getWaterRequirement());

        List<CropImage> cropsImages = new ArrayList<>();
        for(MultipartFile image: images){
            if(image.isEmpty()){
                throw new IllegalArgumentException("Image cannot be empty");
            }

            FileUploadResponse response = imageKitService.upload(image);

            System.out.println("Images: "+ response.url().toString());

            CropImage crpImage = new CropImage();

            crpImage.setImageUrl(
                    response.url().orElseThrow(() ->
                            new IllegalStateException("ImageKit URL is missing")
                    )
            );
            crpImage.setImgId(
                    response.fileId().orElseThrow(() ->
                            new IllegalStateException("ImageKit file ID is missing")
                    )
            );
            crpImage.setCrop(crop);

            cropsImages.add(crpImage);
        }

        crop.setImages(cropsImages);

        cropsRepository.save(crop);

        return crop;
    }

    // Get all pages
    public PageResponseDto<Crop> getAllCrops(int page, int size){

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("name").ascending()
        );

        Page<Crop> cropPage = cropsRepository.findAll(pageable);

        List<Crop> crops = cropPage
                .getContent()
                .stream()
                .map(crop -> new Crop(
                        crop.getId(),
                        crop.getName(),
                        crop.getScientificName(),
                        crop.getCategory(),
                        crop.getDescription(),
                        crop.getImages(),
                        crop.getOrigin(),
                        crop.getSoil(),
                        crop.getTemperature(),
                        crop.getRainfall(),
                        crop.getHumidity(),
                        crop.getSunlight(),
                        crop.getWaterRequirement()
                )).toList();

        return new PageResponseDto<>(
                crops,
                cropPage.getNumber(),
                cropPage.getSize(),
                cropPage.getTotalElements(),
                cropPage.getTotalPages(),
                cropPage.isFirst(),
                cropPage.isLast()
        );
    }

    public Crop getCropById(Long id){

        System.out.println(id);

        Crop crop = cropsRepository.findById(id)
                .orElseThrow(() ->
                        new CropsNotFoundException("Crops not exist with id: "+id)
                );

        return crop;
    }
}
