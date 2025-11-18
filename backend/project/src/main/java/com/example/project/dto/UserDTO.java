package com.example.project.dto;

import jakarta.validation.constraints.Email;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class UserDTO {

    private Long id;
    @NotNull
    @Min(value = 2, message = "name must be at least 2 chars")
    @Max(value = 50, message = "name must be at most 50 chars")
    private String Name;
    @NotNull
    @Email(message="mail should be valid")
    private String mail;
    @NotNull
    private String photoPath;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }
}
