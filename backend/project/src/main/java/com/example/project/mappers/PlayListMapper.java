package com.example.project.mappers;

import com.example.project.dto.CommentDTO;
import com.example.project.dto.PlayListDTO;
import com.example.project.model.Comment;
import com.example.project.model.PlayList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface PlayListMapper {


    PlayListDTO playListToDTO(PlayList p);
    List<PlayListDTO> PlayListsToDTO(List<PlayList> lp);
    PlayList PlayListDTOtoPlayList(PlayListDTO p);
}
