package in.xen.farming_hub.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "crop_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CropImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "crop_id")
    @JsonIgnore
    private Crop crop;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String imgId;
}
