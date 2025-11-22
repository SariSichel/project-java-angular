package com.example.project.dto;

import jakarta.validation.constraints.*;

public class UserDTO {

    private Long id;
    @NotNull
    @Size(min = 2, max = 50, message="name must be between 2 and 50 chars")
//    @Min(value = 2, message = "name must be at least 2 chars")
//    @Max(value = 50, message = "name must be at most 50 chars")
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
        this.id = id;
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
