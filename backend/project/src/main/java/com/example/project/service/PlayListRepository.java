package com.example.project.service;

import com.example.project.model.PlayList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayListRepository extends JpaRepository<PlayList, Long> {
    public List<PlayList> findPlayListsByUserId(Long id);
}
