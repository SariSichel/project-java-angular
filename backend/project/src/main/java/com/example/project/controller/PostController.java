package com.example.project.controller;

import com.example.project.dto.ChatRequest;
import com.example.project.dto.PostDTO;
import com.example.project.mappers.CategoryMapper;
import com.example.project.mappers.CommentMapper;
import com.example.project.mappers.PostMapper;
import com.example.project.mappers.UserMapper;
import com.example.project.model.Post;
import com.example.project.service.AIChatService;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;

//import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/Post")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class PostController {

    PostRepository postRepository;
    PostMapper postMapper;
    //לבדוק אם חייבים את ההזרקות האלו
    UserMapper userMapper;
    CategoryMapper categoryMapper;
    CommentMapper commentMapper;
    private AIChatService aiChatService;


    @Autowired
    public PostController(PostRepository postRepository, PostMapper postMapper, UserMapper userMapper, CategoryMapper categoryMapper, CommentMapper commentMapper,AIChatService aiChatService) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.userMapper = userMapper;
        this.categoryMapper = categoryMapper;
        this.commentMapper = commentMapper;
        this.aiChatService=aiChatService;
    }

    @GetMapping("/getPostById/{postId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PostDTO> getPostById(@PathVariable long postId) {
        try {
            Post p = postRepository.findById(postId).get();
            if (p == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(postMapper.postToPostDTO(p), HttpStatus.OK);
        } catch (Exception e) {
            e.fillInStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getPostsByCategoryId/{id}")
    public ResponseEntity<List<PostDTO>>getPostsByCategoryId(@PathVariable Long id){
        try{
            List<Post> posts=postRepository.findByCategory_Id(id);
            if(posts==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(postMapper.postsToDTO(posts), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //האם צריך להחזיר פוסטים או פוסטים DTO ואותו דבר לפונ מעל
    @GetMapping("/getPostsByUserId/{userId}")
    public ResponseEntity<List<PostDTO>>getPostsByUserId(@PathVariable Long userId){
        try{
            List<Post> posts=postRepository.findPostsByUserId(userId);
            if(posts==null){
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            List<PostDTO> postDTOs= postMapper.postsToDTO(posts);

            return new ResponseEntity<>(postDTOs,HttpStatus.OK);
//            return new ResponseEntity<>(posts, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getPosts")
    public ResponseEntity<List<PostDTO>> getPosts() {
        try {
            List<Post> p = postRepository.findAll();
            List<PostDTO> p1 = postMapper.postsToDTO(p);
            return new ResponseEntity<>(p1, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addPost")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Post> addPost(
        @RequestPart("photo") MultipartFile photo,
        @Valid @RequestPart("post") Post p,
        @RequestPart("audio") MultipartFile audio) {
    try {
        // 1. העלאת תמונה: PhotoUtils שומר את התמונה ומחזיר את הנתיב לשם שלה
        //    (כדאי לוודא שגם PhotoUtils יוצר GUID ושומר אותו ב-p.setPhotoPath)
//        PhotoUtils.uploadImage(photo);
//        p.setPhotoPath((photo.getOriginalFilename()));

        //מהצאט 11/23
        String photoName = PhotoUtils.uploadImage(photo);
        p.setPhotoPath(photoName);



        // 2. העלאת אודיו: קריאה למתודה שמחזירה את שם הקובץ הייחודי + הסיומת
        String uniqueAudioFileName = AudioUtils.uploadAudio(audio);

        // 3. שמירת שם הקובץ הייחודי ב-DB
        //    זה מבטיח שהשם כולל סיומת וזהו השם ש-AudioUtils.getAudio מחפש.
        p.setAudioPath(uniqueAudioFileName);

        // 4. שמירת הפוסט בבסיס הנתונים
        Post post = postRepository.save(p);
        return new ResponseEntity<>(post, HttpStatus.CREATED);

    } catch (Exception e) {
        // חשוב להדפיס את המחסנית המלאה של השגיאה (Stack Trace)
        e.printStackTrace();
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    @GetMapping("/audio/{audioPath}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Resource> getAudio(@PathVariable String audioPath) throws IOException {
        try {
            InputStreamResource resource = AudioUtils.getAudio(audioPath);

            if (resource == null || resource.exists() == false) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND); // 404
            }
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + audioPath + "\"")
                    .contentType(MediaType.parseMediaType("audio/mpeg"))
                    .body(resource);
        }catch (Exception e) {
            e.fillInStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // 500 לשגיאות אחרות
        }
    }

    @DeleteMapping("/deletePostById/{postId}")
    @PreAuthorize("hasRole('ADMIN') or @postRepository.findById(#postId).orElse(null)?.poster.userId == authentication.principal.id")
    public ResponseEntity deletePostById(@PathVariable Long postId) {
        try {
            if (postRepository.existsPostById(postId)) {
                postRepository.deletePostById(postId);
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updatePost")
    @PreAuthorize("@postRepository.findById(#p.getId()).orElse(null)?.user.id == authentication.principal.id")
    public ResponseEntity<PostDTO> updatePost(
          @RequestPart(value = "photo", required = false) MultipartFile photo,
          @Valid @RequestPart("post") Post p,
          @RequestPart(value = "audio", required = false) MultipartFile audio) {
        try {
            Post p1 = postRepository.findById(p.getId()).orElse(null);
            if(p1 == null)
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

//          postMapper.updatePostFromPostDto(p,p1);
            p1.setName(p.getName());
            p1.setDescription(p.getDescription());
            p1.setLyrics(p.getLyrics());
            p1.setUpdateDate(p.getUpdateDate());
            p1.setUsersTookPart(p.getUsersTookPart());
            p1.setCategory(p.getCategory());


            //יש התנהות אחרת בתמונה ובאודיו מה נכון?
//            if (photo != null && !photo.isEmpty()) {
//                PhotoUtils.uploadImage(photo);
//                p1.setPhotoPath(photo.getOriginalFilename());
//            }

            //מהצאט 11/23
            if (photo != null && !photo.isEmpty()) {
                String photoName = PhotoUtils.uploadImage(photo);
                p1.setPhotoPath(photoName);
            }

            // עדכון אודיו אם הועלה חדש
            if (audio != null && !audio.isEmpty()) {
                String uniqueAudioFileName = AudioUtils.uploadAudio(audio);
                p1.setAudioPath(uniqueAudioFileName);
            }

            postRepository.save(p1);

            return new ResponseEntity<>(postMapper.postToPostDTO(p1), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/chat")
//    public String getResponse(@RequestBody ChatRequest chatRequest){
//        return aiChatService.getResponse(chatRequest.message(), chatRequest.conversationId());
//    }

    @PostMapping("/chat")
    public String getResponse(@RequestBody ChatRequest chatRequest){
        return aiChatService.getResponse(chatRequest.message(), chatRequest.conversationId());
    }

}


