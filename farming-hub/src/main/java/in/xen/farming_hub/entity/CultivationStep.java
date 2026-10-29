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
@Table(name = "cultivation_step")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CultivationStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "cultivation_id", nullable = false)
    @JsonIgnore
    private Cultivation cultivation;

    private Integer stepNumber;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "JSON")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> recommendedPractices;

    @Column(columnDefinition = "TEXT")
    private String importantNotes;

//    @OneToMany(
//            mappedBy = "step",
//            cascade = CascadeType.ALL
//    )
//    private List<CultivationStepImage> images;
}



