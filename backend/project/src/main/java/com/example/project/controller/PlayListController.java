package com.example.project.controller;

import com.example.project.dto.PlayListDTO;
import com.example.project.dto.PostDTO;
import com.example.project.mappers.PlayListMapper;
import com.example.project.mappers.PostMapper;
import com.example.project.mappers.UserMapper;
import com.example.project.model.PlayList;
import com.example.project.model.Post;
import com.example.project.model.Users;
import com.example.project.service.PlayListRepository;
import com.example.project.service.PostRepository;
import com.example.project.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequestMapping("api/PlayList")
@RestController
@CrossOrigin
public class PlayListController {

    private final PostMapper postMapper;
    private final PostRepository postRepository;
    private PlayListRepository playListRepository;
    private UsersRepository usersRepository;
    private UserMapper userMapper;
    private PlayListMapper playListMapper;


    @Autowired
    public PlayListController(PlayListRepository playListRepository, PostMapper postMapper, PostRepository postRepository,UsersRepository usersRepository,UserMapper userMapper,PlayListMapper playListMapper) {
        this.playListRepository = playListRepository;
        this.postMapper = postMapper;
        this.postRepository = postRepository;
        this.usersRepository=usersRepository;
        this.userMapper=userMapper;
        this.playListMapper=playListMapper;
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

//    @PostMapping("/addPlayList")
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<PlayList> addPlayList(@RequestBody PlayListDTO p, Authentication authentication) {
//        try {
//            // בדיקה אם authentication קיים
//            if (authentication == null || authentication.getName() == null) {
//                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
//            }
//
//            Users user = usersRepository.findByName(authentication.getName());
//
//            // בדיקה אם המשתמש נמצא
//            if (user == null) {
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            }
//
//            p.setUserDTO(userMapper.userToDTO(user));
//
//            PlayList p1 = playListRepository.save(playListMapper.PlayListDTOtoPlayList(p));
//            return new ResponseEntity<>(p1, HttpStatus.CREATED);
//        } catch (Exception e) {
//            e.printStackTrace(); // הדפס את השגיאה לקונסול
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PostMapping("/addPlayList")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PlayList> addPlayList(@RequestBody PlayListDTO p, Authentication authentication) {
        try {
            if (authentication == null || authentication.getName() == null) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            Users user = usersRepository.findByName(authentication.getName());

            if (user == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            // צור PlayList חדש במקום להשתמש ב-Mapper
            PlayList playList = new PlayList();
            playList.setName(p.getName());
            playList.setUser(user);

            // הגדר תאריכים
            LocalDate now = LocalDate.now();
            playList.setCreationDate(now);
            playList.setLastUpdated(now);

            // שמור
            PlayList savedPlayList = playListRepository.save(playList);

            return new ResponseEntity<>(savedPlayList, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error details: " + e.getMessage());
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

            //בדיקה אם הפוסט כבר קיים בפלייליסט, אם כן זורק שגיאת 409
            if (p.getPosts().contains(p1)) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT); // 409
            }

            p.getPosts().add(p1);
            playListRepository.save(p);
            return new ResponseEntity(p, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}

    @DeleteMapping("/deletePlaylistById/{playlistId}")
    @Transactional
    public ResponseEntity deletePlaylistById(@PathVariable Long playlistId, Authentication authentication) {
        try {
            Optional<PlayList> playlistOpt = playListRepository.findById(playlistId);

            if (!playlistOpt.isPresent()) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }

            PlayList playlist = playlistOpt.get();

            String currentUsername = authentication.getName();
            boolean isOwner = playlist.getUser().getName().equals(currentUsername);

            if (!isOwner) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }

            // נקה את הקשרים עם הפוסטים לפני המחיקה
            if (playlist.getPosts() != null) {
                playlist.getPosts().clear();
                playListRepository.save(playlist);
            }

            playListRepository.deleteById(playlistId);

            return new ResponseEntity(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    }



