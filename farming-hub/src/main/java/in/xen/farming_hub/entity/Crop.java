package in.xen.farming_hub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "crop")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 150)
    private String scientificName;

    @Column(length = 100)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(
            mappedBy = "crop",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<CropImage> images = new ArrayList<>();

    @Column(length = 150)
    private String origin;

    @Column(columnDefinition = "TEXT")
    private String soil;

    @Column(length = 100)
    private String temperature;

    @Column(length = 100)
    private String rainfall;

    @Column(length = 100)
    private String humidity;

    @Column(length = 100)
    private String sunlight;

    @Column(length = 100)
    private String waterRequirement;
}