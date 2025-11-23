package com.example.project.mappers;

import com.example.project.dto.CommentDTO;
import com.example.project.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface CommentMapper {

    CommentDTO commentToDTO(Comment c);
    List<CommentDTO> commentsToDTO(List<Comment> l);
    @Mapping(source = "postId", target = "post.id")
    Comment commentDTOtoComment(CommentDTO c);

}
