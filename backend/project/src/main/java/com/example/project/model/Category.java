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

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
