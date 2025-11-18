package com.example.project.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class UserSignInDTO {

    @NotNull
    @Min(value = 2, message = "name must be at least 2 chars")
    @Max(value = 50, message = "name must be at most 50 chars")
    private String Name;
    @NotNull
    @Min(value = 4, message = "password must be at least 4 chars")
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
