package com.example.project.controller;

import com.example.project.dto.PostDTO;
import com.example.project.mappers.PostMapper;
import com.example.project.model.PlayList;
import com.example.project.model.Post;
import com.example.project.service.PlayListRepository;
import com.example.project.service.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("api/PlayList")
@RestController
@CrossOrigin
public class PlayListController {

    private final PostMapper postMapper;
    private final PostRepository postRepository;
    private PlayListRepository playListRepository;

    @Autowired
    public PlayListController(PlayListRepository playListRepository, PostMapper postMapper, PostRepository postRepository) {
        this.playListRepository = playListRepository;
        this.postMapper = postMapper;
        this.postRepository = postRepository;
    }

    @GetMapping("/getPlayListById/{playListId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PlayList> getPlayListById(@PathVariable Long playListId){
        try{
            PlayList p=playListRepository.findById(playListId).orElse(null);
            if(p==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(p, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //להוסיף פונקציה שמחזירה את כל הפלייליסטים לפי יוזר ID

    @PostMapping("/addPlayList")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PlayList> addPlayList(@RequestBody PlayList p) {
        try {
            PlayList c = playListRepository.save(p);
            return new ResponseEntity<>(c, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getPlayListsByUserId/{id}")
    @PreAuthorize("hasRole('USER')")

    public ResponseEntity<List<PlayList>> getPlayListsByUserId(@PathVariable Long id){
        try{
            List<PlayList> l=playListRepository.findPlayListsByUserId(id);
            if(l==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(l, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/getPostsByPlayListId/{playListId}")
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<List<PostDTO>> getPostsByPlayListId(@PathVariable Long playListId){
//        try{
//            List<Post> p=playListRepository.findByPlayListId(playListId);
//            if(p==null){
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            }
//            return new ResponseEntity<>(postMapper.postsToDTO(p), HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
@GetMapping("/getPostsByPlayListId/{playListId}")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<List<PostDTO>> getPostsByPlayListId(@PathVariable Long playListId){
    try{
        Optional<PlayList> playList = playListRepository.findById(playListId);
        if(playList.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        List<Post> posts = playList.get().getPosts();
        return new ResponseEntity<>(postMapper.postsToDTO(posts), HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@PostMapping("/addPostToPlayList/{playListId}/{postId}")
@PreAuthorize("hasRole('USER')")
    public ResponseEntity<PlayList>addPostToPlayList(@PathVariable Long playListId, @PathVariable Long postId){
        try{
            PlayList p=playListRepository.findPlayListById(playListId);
            if(p==null){
                return new ResponseEntity(null, HttpStatus.NOT_FOUND);
            }
            Post p1=postRepository.findPlayListById(postId);
            if(p1==null){
                return new ResponseEntity(null, HttpStatus.NOT_FOUND);
            }
            p.getPosts().add(p1);
            playListRepository.save(p);
            return new ResponseEntity(p, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}



}
