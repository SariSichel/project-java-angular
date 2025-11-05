package com.example.project.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Category {
    @Id
    @GeneratedValue
    private int Id;
    private String Name;

    @OneToMany(mappedBy = "category")
    private List<Post> posts;

    public Category(int categoryId, String categoryName, List<Post> posts) {
        this.Id = categoryId;
        this.Name = categoryName;
        this.posts = posts;
    }

    public Category() {

    }

    public int getCategoryId() {
        return Id;
    }

    public String getCategoryName() {
        return Name;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setCategoryId(int categoryId) {
        this.Id = categoryId;
    }

    public void setCategoryName(String categoryName) {
        this.Name = categoryName;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
