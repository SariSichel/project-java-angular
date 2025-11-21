package com.example.project.service;

import com.example.project.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    public boolean existsPostById (Long id);
    public  void deletePostById(Long id);
    public List<Post> findPostsByCategoryId(Long id);
    public List<Post> findPostsByUserId(Long id);

}
