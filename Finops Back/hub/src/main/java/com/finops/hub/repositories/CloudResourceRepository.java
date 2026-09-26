package com.finops.hub.repositories;

import com.finops.hub.entities.CloudResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CloudResourceRepository extends JpaRepository<CloudResource, Long> {
    List<CloudResource> findByStatusAndCpuUtilizationPctLessThan(CloudResource.Status status, Double cpuUtilizationPct);
}