package com.example.project.controller;

import com.example.project.model.PlayList;
import com.example.project.service.PlayListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/PlayList")
@RestController
@CrossOrigin
public class PlayListController {

    private PlayListRepository playListRepository;

    @Autowired
    public PlayListController(PlayListRepository playListRepository) {
        this.playListRepository = playListRepository;
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
}
