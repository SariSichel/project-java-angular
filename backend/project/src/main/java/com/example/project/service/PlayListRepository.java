package com.example.project.service;

import com.example.project.dto.PostDTO;
import com.example.project.model.PlayList;
import com.example.project.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayListRepository extends JpaRepository<PlayList, Long> {
    public List<PlayList> findPlayListsByUserId(Long id);
//    public List<Post> findByPlayListId(Long id);
    public PlayList findPlayListById(Long Id);
}
