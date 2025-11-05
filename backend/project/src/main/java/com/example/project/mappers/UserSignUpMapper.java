package com.example.project.mappers;

import com.example.project.dto.UserSignUpDTO;
import com.example.project.model.Users;
import com.example.project.service.PhotoUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.io.IOException;
import java.util.List;

@Mapper(componentModel = "spring")
public interface UserSignUpMapper {

    List<UserSignUpDTO> usrsToUserSignUpDtoList(List<Users> l);

    Users userSignUpDTOtoUser(UserSignUpDTO u);

    @Mapping(target = "photo", source = "photoPath", qualifiedByName = "loadImage")
    UserSignUpDTO userSignUpToDTO(Users u);

    @Named("loadImage")
    default String mapImage(String path) throws IOException {
        if (path == null) return null;
        return PhotoUtils.getImage(path);
    }
//    default UserSignUpDTO userSignUpToDTO(Users u) throws IOException {
//        UserSignUpDTO userSignUpDTO= new UserSignUpDTO();
//        userSignUpDTO.setName(u.getUserName());
//        userSignUpDTO.setPassword(u.getPassword());
//        userSignUpDTO.setMail(u.getMail());
//        userSignUpDTO.setPhoto(PhotoUtils.getImage(u.getPhotoPath()));
//       return userSignUpDTO;
//    }

}
