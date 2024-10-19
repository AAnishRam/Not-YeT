package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.model.Message;
import java.util.*;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByCommunicationId(Long communicationId);
}
