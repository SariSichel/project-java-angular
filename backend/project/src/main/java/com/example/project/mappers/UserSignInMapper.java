package com.example.project.mappers;

import com.example.project.dto.UserSignInDTO;
import com.example.project.model.Users;
import org.mapstruct.Mapper;

import java.util.List;
@Mapper(componentModel = "spring")

public interface UserSignInMapper {
    List<UserSignInDTO> usersToUserSignInDTO (List<Users> users);

    Users userSignInDTOtoUsers(UserSignInDTO u);

    UserSignInDTO userToUserSignInDTO(Users u);
}
