package com.example.project.controller;

import com.example.project.dto.UserDTO;
import com.example.project.dto.UserSignInDTO;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.project.service.PhotoUtils;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;

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

    @GetMapping("/getUserById/{userId}")
   //@PreAuthorize("@postRepository.findById(#userId).orElse(null)?.poster.userId == authentication.principal.id")
    @PreAuthorize("#userId == authentication.principal.id")

    public ResponseEntity<UserDTO> getUserSignUpById(@PathVariable Long userId){
        try{
            Users u=userRepository.findById(userId).orElse(null);
            if(u==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(userMapper.userToDTO(u), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@Valid @RequestBody UserSignInDTO u){

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

//    @PostMapping("/signUp")
//    public ResponseEntity <UserDTO> signUp(@Valid @RequestPart("photo") MultipartFile photo, @RequestPart("userSignUp") UserSignUpDTO userSignUp){
//        Users u=userRepository.findByName(userSignUp.getName());
//        if(u!=null)
//            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        try{
//            PhotoUtils.uploadImage(photo);
//            userSignUp.setPhotoPath((photo.getOriginalFilename()));
//
//            String password=userSignUp.getPassword();
//            userSignUp.setPassword(new BCryptPasswordEncoder().encode(password));
//
//            Users user=userSignUpMapper.userSignUpDTOtoUser(userSignUp);
//              user.getRoles().add(roleRepository.findById((long)1).get());
//              userRepository.save(user);
//               return new ResponseEntity<>(userMapper.userToDTO(user),HttpStatus.CREATED);
//    }catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PostMapping("/signUp")
    public ResponseEntity<UserDTO> signUp(
            @RequestPart("photo") MultipartFile photo,
            @Valid @RequestPart("userSignUp") UserSignUpDTO userSignUp) {

        Users u = userRepository.findByName(userSignUp.getName());
        if (u != null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        try {
            // בדוק אם יש תמונה
            if (photo == null || photo.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            PhotoUtils.uploadImage(photo);
            // עכשיו זה הגיוני - את מגדירה את הנתיב אחרי ההעלאה
            userSignUp.setPhotoPath(photo.getOriginalFilename());

            String password = userSignUp.getPassword();
            userSignUp.setPassword(new BCryptPasswordEncoder().encode(password));

            Users user = userSignUpMapper.userSignUpDTOtoUser(userSignUp);
            user.getRoles().add(roleRepository.findById(1L).get());
            userRepository.save(user);

            return new ResponseEntity<>(userMapper.userToDTO(user), HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signout")
     @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> signOut(){
        ResponseCookie cookie=jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body("you've been signed out!");
    }


    @PutMapping("/updateUser")
    //@PreAuthorize("hasRole('USER')")
    @PreAuthorize("hasRole('ADMIN') or #userUpdate.id == authentication.principal.id")
    public ResponseEntity<Users> updateUser(

            @RequestPart("photo") MultipartFile photo,
            @Valid @RequestPart("userUpdate") UserDTO userUpdate) {

        try {
            Users u1 = userRepository.findById(userUpdate.getId()).orElse(null);
            if (u1 == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

            // אם יש תמונה — שומרים
            if (photo != null && !photo.isEmpty()) {
                PhotoUtils.uploadImage(photo);
                u1.setPhotoPath(photo.getOriginalFilename());
            }

            u1.setMail(userUpdate.getMail());
            u1.setName(userUpdate.getName());

            userRepository.save(u1);
            return new ResponseEntity<>(u1, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//מהצאט
    @GetMapping("/status")
    public ResponseEntity<Boolean> status() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.ok(true);
        }

        return ResponseEntity.ok(false);
    }


//    @PostMapping("/addUser")
//    public ResponseEntity<Users> addUser(@RequestPart("photo") MultipartFile photo, @RequestPart("post") Users u){
//        try{
//            PhotoUtils.uploadImage(photo);
//            u.setPhotoPath((photo.getOriginalFilename()));
//            Users u1=userRepository.save(u);
//            return new ResponseEntity<>(u1, HttpStatus.CREATED);
//            //לסדר את האודיו
//
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//    }





}



