package in.xen.farming_hub.exception;

import in.xen.farming_hub.dto.ApiErrorResponse;
import in.xen.farming_hub.dto.ApiResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;


@RestControllerAdvice
/*
 @ControllerAdvice or @RestControllerAdvice -> Kisi bhe controller me koi bhe exception ata
 hai to ye class handle kare ga na ke controller
 */
public class GlobalExceptionHandler {

    // IF any throw any runtime exception (For handling any runtime exception)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }


    // For validation exception error
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationException(
            MethodArgumentNotValidException exception) {

        Map<String, String> errors = new LinkedHashMap<>();

        exception.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        ApiErrorResponse response = new ApiErrorResponse(
                false,
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                errors,
                Instant.now()
        );

        return ResponseEntity.badRequest().body(response);
    }


    // IF throw any BadCredentialException
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiErrorResponse> handleBadCredentials(
            BadCredentialsException ex
    ){

        Map<String, String> errors = new LinkedHashMap<>();
        errors.put("credentials", "Invalid email or password");

        ApiErrorResponse errorResponse = new ApiErrorResponse(
                false,
                HttpStatus.UNAUTHORIZED.value(),
                "Invalid Credentials",
                errors,
                Instant.now()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(errorResponse);
    }

    // Duplicate entry
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiErrorResponse<?>> handleDuplicateEntry(
            DataIntegrityViolationException ex
    ) {

        ex.printStackTrace();

        ApiErrorResponse<?> response = new ApiErrorResponse<>(
                false,
                HttpStatus.CONFLICT.value(),
                "Duplicate entry",
                Map.of("name", "Crop with this name already exists"),
                Instant.now()
        );

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(response);
    }


    /*
    Agar koi exception handle na ho to wo ise bhe handle kar le ga
    it means it is like default exception. it run for any type of exception.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGenericException(Exception ex){

        System.out.println(ex.getMessage());

        ApiErrorResponse<?> response = new ApiErrorResponse<>(
                false,
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                Map.of("Server Error", "Something went wrong. Please try again later."),
                Instant.now()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}
