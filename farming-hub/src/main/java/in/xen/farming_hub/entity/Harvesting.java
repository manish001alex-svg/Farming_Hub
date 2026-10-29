package in.xen.farming_hub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
@Table(name = "harvesting")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Harvesting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "crop_id", nullable = false, unique = true)
    @JsonIgnore
    private Crop crop;

    private String harvestingTime;

    @Column(columnDefinition = "TEXT")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> maturityIndicators;

    @Column(columnDefinition = "TEXT")
    private String harvestingMethod;


    @OneToMany(mappedBy = "harvesting", cascade = CascadeType.ALL)
    private List<HarvestingStep> steps;

    @Column(columnDefinition = "TEXT")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> postHarvestHandling;

    @Column(columnDefinition = "TEXT")
    private String storage;

    @Column(columnDefinition = "TEXT")
    private String youtubeUrl;

}
