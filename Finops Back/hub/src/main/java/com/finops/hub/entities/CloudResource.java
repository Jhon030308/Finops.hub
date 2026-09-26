package com.finops.hub.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tb_cloud_resource")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CloudResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Provider provider;

    @Column(name = "resource_type", nullable = false)
    private String resourceType;

    @Column(name = "cost_per_hour", nullable = false)
    private BigDecimal costPerHour;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "cpu_utilization_pct")
    private Double cpuUtilizationPct;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    public enum Provider {
        AWS, AZURE, GCP
    }

    public enum Status {
        RUNNING, STOPPED
    }
}