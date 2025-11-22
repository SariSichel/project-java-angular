package com.example.project.mappers;

import com.example.project.dto.PostDTO;
import com.example.project.model.Post;
import com.example.project.service.PhotoUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.jpa.domain.JpaSort;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;


@Mapper(componentModel = "spring" , uses = {UserSignUpMapper.class,CommentMapper.class})

public interface PostMapper {

    List<PostDTO> postsToDTO (List<Post> posts);
    //לא בטוח שצריך את זה
    Post postDTOtoPost(PostDTO post);

//    בטרגט מה שיש בדי טי או ובסורס מה שיש ברגיל
    @Mapping(target = "user", source = "user")
    //, ignore = true   לא בטוח שצריך את זה
    @Mapping(target = "comments", source = "comments", ignore = true )
    @Mapping(target = "photoPath", source = "photoPath", qualifiedByName = "loadImage")
    PostDTO postToPostDTO(Post post);


    //?
//    @Mapping(target = "post.category", source = "post.category")
//    Post updatePostFromPostDto(PostDTO post, Post post2);

//    default PostDTO postToDTO(Post p) throws IOException
//    {
//        PostDTO postDTO=new PostDTO();
//
//        postDTO.setId(p.getId());
//        postDTO.setName(p.getName());
//        postDTO.setDescription(p.getDescription());
//        postDTO.setLyrics(p.getLyrics());
//        postDTO.setUpdateDate(p.getUpdateDate());
//        postDTO.setUpdateDate(p.getUpdateDate());
//
//        postDTO.setUser(userMapper.userToDTO(p.getUser()));
//        postDTO.setCategory(categoryMapper.categoryToDTO(p.getCategory()));
//        postDTO.setUsersTookPart(userMapper.usersNameToDTO(p.getUsersTookPart()));
//        postDTO.setComments(commentMapper.commentsToDTO(p.getComments()));
////        Path photoFileName=Paths.get(p.getPhotoPath());
////        byte[] bytePhoto=Files.readAllBytes(photoFileName);
////        postDTO.setPhoto(Base64.getEncoder().encodeToString(bytePhoto));
//        postDTO.setPhoto(PhotoUtils.getImage(p.getPhotoPath()));
//
////        Path audioFileName=Paths.get(p.getAudioPath());
////        byte[] byteAudio=Files.readAllBytes(audioFileName);
////        postDTO.setAudio(Base64.getEncoder().encodeToString(byteAudio));
//        postDTO.setAudioPath(p.getAudioPath());
//
//        return postDTO;
//    }


}
