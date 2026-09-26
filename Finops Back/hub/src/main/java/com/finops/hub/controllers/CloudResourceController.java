package com.finops.hub.controllers;

import com.finops.hub.entities.CloudResource;
import com.finops.hub.repositories.CloudResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class CloudResourceController {

    @Autowired
    private CloudResourceRepository resourceRepository;

    @GetMapping
    public ResponseEntity<List<CloudResource>> findAll() {
        List<CloudResource> list = resourceRepository.findAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<CloudResource> create(@RequestBody CloudResource resource) {
        CloudResource savedResource = resourceRepository.save(resource);
        return ResponseEntity.ok(savedResource);
    }
}