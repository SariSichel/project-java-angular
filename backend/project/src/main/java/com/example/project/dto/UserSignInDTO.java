package com.example.project.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserSignInDTO {

    @NotNull
    @Size(min = 2, max=50 , message = "name must be at least 2 chars and at most 50 chars")

    private String Name;
    @NotNull
    @Size(min = 4, message = "password must be at least 4 chars")

    private String password;

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
