package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.model.Communication;

import java.util.Optional;

@Repository
public interface CommunicationRepository extends JpaRepository<Communication, Long> {
    Optional<Communication> findByProjectId(Long projectId);
}
