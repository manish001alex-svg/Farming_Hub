package in.xen.farming_hub.dto;

import java.time.Instant;

public record ApiResponse<T>(
        boolean success,
        int status,
        String message,
        T data,
        Instant timestamp
) {
}
