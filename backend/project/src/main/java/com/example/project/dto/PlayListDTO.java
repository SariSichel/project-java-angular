package com.example.project.dto;

import com.example.project.model.Post;
import jakarta.persistence.GeneratedValue;

import java.time.LocalDate;
import java.util.List;

public class PlayListDTO {
    @GeneratedValue
    private int id;
    private String name;
    private LocalDate creationDate;
    private LocalDate lastUpdated;

    private UserDTO userDTO;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDate lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }
    
}
