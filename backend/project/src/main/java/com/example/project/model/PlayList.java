package com.example.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class PlayList {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private LocalDate creationDate;
    private LocalDate lastUpdated;

    @ManyToOne
    @JsonIgnore
    private Users user;

    @ManyToMany
    //שינוי שנעשה עבור מחיקת פוסט
    @JoinTable(
            name = "play_list_posts",
            joinColumns = @JoinColumn(name = "play_list_id"),
            inverseJoinColumns = @JoinColumn(name = "posts_id")
    )
    @JsonIgnore
    private List<Post> posts;

    public PlayList(Long platListId, String playListName, LocalDate creationDate, LocalDate lastUpdated, Users user, List<Post> posts) {
        this.id = platListId;
        this.name = playListName;
        this.creationDate = creationDate;
        this.lastUpdated = lastUpdated;
        this.user = user;
        this.posts = posts;
    }

    public PlayList() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
