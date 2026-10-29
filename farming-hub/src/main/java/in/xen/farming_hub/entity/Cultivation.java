package in.xen.farming_hub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "cultivation")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cultivation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "crop_id", nullable = false, unique = true)
    @JsonIgnore
    private Crop crop;

    private String showing_time;
    private String growing_Duration;
    private String harvesting_Period;
    private String youtube_url;

    @OneToMany(mappedBy = "cultivation", cascade = CascadeType.ALL)
    private List<CultivationStep> steps;
}
