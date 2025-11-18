package com.example.project.dto;

import jakarta.validation.constraints.*;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Max;

//@Validated
public class UserSignUpDTO {

    @NotBlank(message = "name is required")
    @Size(min = 2, max = 50, message = "name must be between 2 and 50 chars")// עדיף להשתמש ב-@Size במקום @Min/@Max על String    @Min(value = 2, message = "name must be at least 2 chars")
    private String name;
    @NotBlank(message = "mail is required")
    @Email(message="mail should be valid")
    private String mail;
    @NotBlank(message = "password is required")
    @Size(min = 4, message = "password must be at least 4 chars")
    private String password;
    private String photo;
    //@NotNull(message = "photoPath is required")
    private String photoPath;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }
}
