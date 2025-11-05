package com.example.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Comment {
    @Id
    @GeneratedValue
    private int id;
    private String text;
    private int rating;
    private LocalDate updateDate;

    @ManyToOne
    private Users user;

    @ManyToOne
    private Post post;

    public Comment(int id, String text, int rating, LocalDate updateDate, Users user, Post post) {
        this.id = id;
        this.text = text;
        this.rating = rating;
        this.updateDate = updateDate;
        this.user = user;
        this.post = post;
    }

    public Comment() {

    }

    public int getid() {
        return id;
    }

    public String getText() {
        return text;
    }

    public int getRating() {
        return rating;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public Users getUser() {
        return user;
    }

    public Post getPost() {
        return post;
    }

    public void setCommentid(int commentid) {
        this.id = commentid;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
