package com.example.project.controller;

import com.example.project.model.PlayList;
import com.example.project.service.PlayListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/PlayList")
@RestController
@CrossOrigin
public class PlayListController {

    private PlayListRepository playListRepository;

    @Autowired
    public PlayListController(PlayListRepository playListRepository) {
        this.playListRepository = playListRepository;
    }

    @GetMapping("/getPlayListById/{id}")
    public ResponseEntity<PlayList> getPlayListById(@PathVariable Long id){
        try{
            PlayList p=playListRepository.findById(id).orElse(null);
            if(p==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(p, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addPlayList")
    public ResponseEntity<PlayList> addPlayList(@RequestBody PlayList p) {
        try {
            PlayList c = playListRepository.save(p);
            return new ResponseEntity<>(c, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
