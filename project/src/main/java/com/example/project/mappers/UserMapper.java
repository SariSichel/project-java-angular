package com.example.project.mappers;

import com.example.project.dto.UserDTO;
import com.example.project.model.Users;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")

public interface UserMapper {

    UserDTO userToDTO(Users user);

    Users dtoToUser(UserDTO dto);

    List<UserDTO> usersToDTO(List<Users> users);
}
