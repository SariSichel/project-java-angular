package com.example.project.controller;

import com.example.project.dto.PostDTO;
import com.example.project.mappers.CategoryMapper;
import com.example.project.mappers.CommentMapper;
import com.example.project.mappers.PostMapper;
import com.example.project.mappers.UserMapper;
import com.example.project.model.Post;
import com.example.project.service.AudioUtils;
import com.example.project.service.PhotoUtils;
import com.example.project.service.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/Post")
@CrossOrigin
public class PostController {

    PostRepository postRepository;
    PostMapper postMapper;
    //לבדוק אם חייבים את הזרקות האלו
    UserMapper userMapper;
    CategoryMapper categoryMapper;
    CommentMapper commentMapper;

    @Autowired
    public PostController(PostRepository postRepository, PostMapper postMapper, UserMapper userMapper, CategoryMapper categoryMapper, CommentMapper commentMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.userMapper = userMapper;
        this.categoryMapper = categoryMapper;
        this.commentMapper = commentMapper;
    }

    @GetMapping("/getPostById/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable long id){
    try{
        Post p=postRepository.findById(id).get();
        if(p==null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(postMapper.postToPostDTO(p), HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    @GetMapping("/getPosts")
    public ResponseEntity <List<PostDTO>> getPosts(){
        try{
            List<Post> p=postRepository.findAll();
            List<PostDTO> p1=postMapper.postsToDTO(p);
            return new ResponseEntity<>(p1, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addPost")
    public ResponseEntity<Post> addPost(@RequestPart("photo") MultipartFile photo, @RequestPart("post") Post p, @RequestPart("audio") MultipartFile audio){
        try{

            PhotoUtils.uploadImage(photo);
            AudioUtils.uploadAudio(audio);

            p.setPhotoPath((photo.getOriginalFilename()));
            p.setAudioPath(audio.getOriginalFilename());

            Post post=postRepository.save(p);
            return new ResponseEntity<>(post, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}

    @GetMapping("/audio/{audioPath}")
    public ResponseEntity<Resource> getAudio(@PathVariable String audioPath) throws IOException {
        InputStreamResource resource= AudioUtils.getAudio(audioPath);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + audioPath + "\"")
                .contentType(MediaType.parseMediaType("audio/mpeg"))
                .body(resource);
    }
}
