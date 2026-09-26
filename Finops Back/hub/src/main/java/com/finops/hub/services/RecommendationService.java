package com.finops.hub.services;

import com.finops.hub.entities.CloudResource;
import com.finops.hub.entities.CostRecommendation;
import com.finops.hub.repositories.CloudResourceRepository;
import com.finops.hub.repositories.CostRecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private CloudResourceRepository resourceRepository;

    @Autowired
    private CostRecommendationRepository recommendationRepository;

    /**
     * Identifica recursos ativos em nuvem com CPU subutilizada (< 10%) 
     * e gera recomendações de desligamento/otimização.
     */
    public void processIdleResources() {
        // Procura por recursos em execução com uso de CPU menor que 10%
        List<CloudResource> idleResources = resourceRepository.findByStatusAndCpuUtilizationPctLessThan(
                CloudResource.Status.RUNNING, 10.0
        );

        for (CloudResource resource : idleResources) {
            CostRecommendation rec = new CostRecommendation();
            rec.setResource(resource);
            rec.setRecommendationType(CostRecommendation.RecommendationType.IDLE_SHUTDOWN);

            // Estimativa de poupança mensal considerando 720 horas operacionais por mês
            BigDecimal monthlyCost = resource.getCostPerHour().multiply(new BigDecimal("720"));
            rec.setPotentialSavingsMonthly(monthlyCost);
            rec.setStatus(CostRecommendation.Status.PENDING);

            recommendationRepository.save(rec);
        }
    }

    /**
     * Retorna a lista completa de recomendações geradas no sistema.
     */
    public List<CostRecommendation> findAll() {
        return recommendationRepository.findAll();
    }
}