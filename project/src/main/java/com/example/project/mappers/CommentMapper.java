package com.example.project.mappers;

import com.example.project.dto.CommentDTO;
import com.example.project.model.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")

public interface CommentMapper {

    CommentDTO commentToDTO(Comment c);
    List<CommentDTO> commentsToDTO(List<Comment> l);
    Comment commentDTOtoComment(CommentDTO c);

}
