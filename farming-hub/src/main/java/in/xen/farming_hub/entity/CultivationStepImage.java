package in.xen.farming_hub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cultivation_step_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CultivationStepImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id", nullable = false)
    private CultivationStep step;


    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String imgId;
}
