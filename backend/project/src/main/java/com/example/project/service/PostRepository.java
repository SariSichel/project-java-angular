//package com.example.project.service;
//
//import com.example.project.model.Post;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface PostRepository extends JpaRepository<Post, Long> {
//
//    public boolean existsPostById (Long id);
//    public  void deletePostById(Long id);
////    public List<Post> findPostsByCategoryId(Long id);
//    public List<Post> findPostsByUserId(Long id);
//
//    List<Post> findByCategory_Id(Long categoryId);
//    public Post findPlayListById(Long postId);
//
//    // חיפוש לפי שם מדויק
//    List<Post> findByTitle(String title);
//
//    // חיפוש לפי שם שמכיל טקסט (case-insensitive)
//    List<Post> findByTitleContainingIgnoreCase(String keyword);
//
//    // חיפוש לפי מילים בטקסט השיר
//    List<Post> findByLyricsContainingIgnoreCase(String keyword);
//
//    // חיפוש משולב - או בשם או במילים
//    List<Post> findByTitleContainingIgnoreCaseOrLyricsContainingIgnoreCase(
//            String titleKeyword, String lyricsKeyword);
//
//
//
//}
package com.example.project.service;

import com.example.project.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    public boolean existsPostById (Long id);
    public void deletePostById(Long id);
    public List<Post> findPostsByUserId(Long id);
    List<Post> findByCategory_Id(Long categoryId);
    public Post findPlayListById(Long postId);

    // חיפוש לפי שם מדויק
    List<Post> findByName(String name);

    // חיפוש לפי שם שמכיל טקסט (case-insensitive)
    List<Post> findByNameContainingIgnoreCase(String keyword);

    // חיפוש לפי מילים בטקסט השיר
    List<Post> findByLyricsContainingIgnoreCase(String keyword);

    // חיפוש משולב - או בשם או במילים
    List<Post> findByNameContainingIgnoreCaseOrLyricsContainingIgnoreCase(
            String nameKeyword, String lyricsKeyword);

    // הוסף את המתודה הזו ב-PostRepository
//    List<Post> findAllByOrderByAverageRatingDesc();
}
