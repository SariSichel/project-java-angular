package com.example.project.controller;

import com.example.project.dto.UserDTO;
import com.example.project.dto.UserSignUpDTO;
import com.example.project.mappers.UserMapper;
import com.example.project.mappers.UserSignUpMapper;
import com.example.project.model.Post;
import com.example.project.model.Users;
import com.example.project.security.CustomUserDetails;
import com.example.project.security.jwt.JwtUtils;
import com.example.project.service.AudioUtils;
import com.example.project.service.PhotoUtils;
import com.example.project.service.RoleRepository;
import com.example.project.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.project.service.PhotoUtils;

import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/User")
@CrossOrigin

public class UserController {

    private final UserMapper userMapper;
    UsersRepository userRepository;
    UserSignUpMapper userSignUpMapper;
    RoleRepository roleRepository;

    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    @Autowired
    public UserController(UsersRepository userRepository, UserSignUpMapper userSignUpMapper, RoleRepository roleRepository, AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userSignUpMapper = userSignUpMapper;
        this.roleRepository=roleRepository;
        this.authenticationManager=authenticationManager;
        this.jwtUtils=jwtUtils;
        this.userMapper = userMapper;
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<UserDTO> getUserSignUpById(@PathVariable Long id){
        try{
            Users u=userRepository.findById(id).get();
            if(u==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(userMapper.userToDTO(u), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Users u){
        Authentication authentication=authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(u.getName(),u.getPassword()));

        //שומר את האימות
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //CustomUserDetails לוקח את פרטי המשתמש ומכניס אותם
        CustomUserDetails userDetails=(CustomUserDetails)authentication.getPrincipal();

        ResponseCookie jwtCookie=jwtUtils.generateJwtCookie(userDetails);

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,jwtCookie.toString())
                .body(userDetails.getUsername());
    }

    @PostMapping("/signUp")
    public ResponseEntity <UserDTO> signUp(@RequestPart("photo") MultipartFile photo, @RequestPart("userSignUp") UserSignUpDTO userSignUp){
        Users u=userRepository.findByName(userSignUp.getName());
        if(u!=null)
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        try{
            PhotoUtils.uploadImage(photo);
            userSignUp.setPhotoPath((photo.getOriginalFilename()));

            String password=userSignUp.getPassword();
            userSignUp.setPassword(new BCryptPasswordEncoder().encode(password));

            Users user=userSignUpMapper.userSignUpDTOtoUser(userSignUp);
              user.getRoles().add(roleRepository.findById((long)1).get());
              userRepository.save(user);
               return new ResponseEntity<>(userMapper.userToDTO(user),HttpStatus.CREATED);
    }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signOut(){
        ResponseCookie cookie=jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body("you've been signed out!");
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



