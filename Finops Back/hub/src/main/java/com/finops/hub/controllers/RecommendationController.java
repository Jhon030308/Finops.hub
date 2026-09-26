package com.finops.hub.controllers;

import com.finops.hub.entities.CostRecommendation;
import com.finops.hub.services.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping
    public ResponseEntity<List<CostRecommendation>> findAll() {
        List<CostRecommendation> list = recommendationService.findAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/process")
    public ResponseEntity<Void> processRecommendations() {
        recommendationService.processIdleResources();
        return ResponseEntity.ok().build();
    }
}