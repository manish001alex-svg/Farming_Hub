package in.xen.farming_hub.service;

import io.imagekit.client.ImageKitClient;
import io.imagekit.models.files.FileUploadParams;
import io.imagekit.models.files.FileUploadResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageKitService {

    private final ImageKitClient imageKitClient;

    public ImageKitService(ImageKitClient imageKitClient) {
        this.imageKitClient = imageKitClient;
    }

    public FileUploadResponse upload(MultipartFile file) throws Exception {

        FileUploadParams params = FileUploadParams.builder()
                .file(file.getBytes())
                .fileName(file.getOriginalFilename())
                .build();

        return imageKitClient.files().upload(params);
    }
}