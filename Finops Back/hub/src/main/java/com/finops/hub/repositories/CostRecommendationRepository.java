package com.finops.hub.repositories;

import com.finops.hub.entities.CostRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CostRecommendationRepository extends JpaRepository<CostRecommendation, Long> {
    List<CostRecommendation> findByStatus(CostRecommendation.Status status);
}