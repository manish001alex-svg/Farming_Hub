package in.xen.farming_hub.config;

import io.imagekit.client.ImageKitClient;
import io.imagekit.client.okhttp.ImageKitOkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ImageKitConfig {

    @Bean
    public ImageKitClient imageKitClient() {

//        String privateKey = System.getenv("IMAGEKIT_PRIVATE_KEY");

//        System.out.println("ImageKit key exists: " + (privateKey != null));

        return ImageKitOkHttpClient
                .builder()
                .privateKey("private_D9mseLFZOoyNAIkLielOVl6wBGQ=")
                .build();
    }

//    @Bean
//    public ImageKitClient imageKitClient() {
//        return ImageKitOkHttpClient.fromEnv();
//    }

}
