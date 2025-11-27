package com.example.project.controller;

import com.example.project.dto.CommentDTO;
import com.example.project.mappers.CommentMapper;
import com.example.project.model.Comment;
import com.example.project.model.Post;
import com.example.project.service.CommentRepository;
import com.example.project.service.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/Comment")
@RestController
@CrossOrigin
public class CommentController {

    private CommentRepository commentRepository;
    private CommentMapper commentMapper;
    private PostRepository postRepository;

    @Autowired
    public CommentController(CommentRepository commentRepository, CommentMapper commentMapper,PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.postRepository=postRepository;
    }

   // @GetMapping("/getCommentsByPostId/{postId}")

    @GetMapping("/getCommentById/{commentId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable Long commentId){
        try{
            Comment c=commentRepository.findById(commentId).orElse(null);
            if(c==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(commentMapper.commentToDTO(c), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //יש לטפל בפונקציה הזו
    //יש לדאוג שתגובה תתווסף לפוסט המתאים
    //על ידי הזרקת תלויות של הפובט והתגובה...
    @PostMapping("/addComment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Comment> addComment(@RequestBody CommentDTO c) {
        try {
            Comment c1 = commentMapper.commentDTOtoComment(c);

            Post post = postRepository.findById(c.getPostId()).orElse(null);;

            if (post==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            c1.setPost(post);

            Comment saveComment=commentRepository.save(c1);

            return new ResponseEntity<>(saveComment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getCommentsByPostId/{postId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<CommentDTO>> getCommentsByPostId(@PathVariable Long postId){
        try{
            List<Comment> c=commentRepository.findComentsByPostId(postId);
            if(c==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(commentMapper.commentsToDTO(c), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
