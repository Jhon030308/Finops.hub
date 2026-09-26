package com.finops.hub.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tb_cost_recommendation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CostRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = false)
    private CloudResource resource;

    @Enumerated(EnumType.STRING)
    @Column(name = "recommendation_type", nullable = false)
    private RecommendationType recommendationType;

    @Column(name = "potential_savings_monthly", nullable = false)
    private BigDecimal potentialSavingsMonthly;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public enum RecommendationType {
        RIGHTSIZING, IDLE_SHUTDOWN
    }

    public enum Status {
        PENDING, APPLIED, IGNORED
    }
}