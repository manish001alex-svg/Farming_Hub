package in.xen.farming_hub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "harvesting_step")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HarvestingStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "harvesting_id", nullable = false)
    @JsonIgnore
    private Harvesting harvesting;

    private Integer stepNumber;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;
}
