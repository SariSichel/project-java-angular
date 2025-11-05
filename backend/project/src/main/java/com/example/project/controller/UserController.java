package com.example.project.controller;

import com.example.project.dto.UserSignUpDTO;
import com.example.project.mappers.UserSignUpMapper;
import com.example.project.model.Users;
import com.example.project.service.PhotoUtils;
import com.example.project.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/User")
@CrossOrigin

public class UserController {

    UsersRepository userRepository;
    UserSignUpMapper userSignUpMapper;

    @Autowired
    public UserController(UsersRepository userRepository, UserSignUpMapper userSignUpMapper) {
        this.userRepository = userRepository;
        this.userSignUpMapper = userSignUpMapper;
    }

    @GetMapping("/getUserSignUpById/{id}")
    public ResponseEntity<UserSignUpDTO> getUserSignUpById(@PathVariable Long id){
        try{
            Users u=userRepository.findById(id).get();
            if(u==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(userSignUpMapper.userSignUpToDTO(u), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addUser")
    public ResponseEntity<Users> addUser(@RequestPart("photo") MultipartFile photo, @RequestPart("post") Users u){
        try{
            PhotoUtils.uploadImage(photo);
            u.setPhotoPath((photo.getOriginalFilename()));
            Users u1=userRepository.save(u);
            return new ResponseEntity<>(u1, HttpStatus.CREATED);
            //לסדר את האודיו

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}
    }
