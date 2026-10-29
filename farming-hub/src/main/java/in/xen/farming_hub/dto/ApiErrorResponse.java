package in.xen.farming_hub.dto;

import java.time.Instant;
import java.util.Map;

public record ApiErrorResponse<T>(
        boolean success,
        int status,
        String message,
        Map<String, String> errors,
        Instant timestamp
) {
}
