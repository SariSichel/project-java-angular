package com.example.project.dto;

import java.time.LocalDate;

public class CommentDTO {

    private int id;
    private String text;
    private int rating;
    private LocalDate updateDate;
    private UserDTO userName;
    private int postId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public UserDTO getUserName() {
        return userName;
    }

    public void setUserName(UserDTO userName) {
        this.userName = userName;
    }
}
