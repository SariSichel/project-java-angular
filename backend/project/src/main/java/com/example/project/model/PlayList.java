package com.example.project.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class PlayList {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private LocalDate creationDate;
    private LocalDate lastUpdated;

    @ManyToOne
    private Users user;

    //??
    @ManyToMany
    private List<Post> posts;

    public PlayList(int platListId, String playListName, LocalDate creationDate, LocalDate lastUpdated, Users user, List<Post> posts) {
        this.id = platListId;
        this.name = playListName;
        this.creationDate = creationDate;
        this.lastUpdated = lastUpdated;
        this.user = user;
        this.posts = posts;
    }

    public PlayList() {

    }

    public int getId() {
        return id;
    }

    public void setId(int platListId) {
        this.id = platListId;
    }

    public String getPlayListName() {
        return name;
    }

    public void setPlayListName(String playListName) {
        this.name = playListName;
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

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
