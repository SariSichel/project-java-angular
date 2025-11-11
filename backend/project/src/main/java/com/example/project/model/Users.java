package com.example.project.model;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String mail;
    private String password;
    private String photoPath;

    @OneToMany(mappedBy = "user")
    private List<Post> uploadPosts;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @OneToMany(mappedBy = "user")
    private List<PlayList> playlists;

    @ManyToMany
    private Set<Role> roles=new HashSet<>();

    public Users(Long userId, String userName, String mail, String password, List<Post> uploadPosts, List<Comment> comments, List<PlayList> playlists, List<Post> postsTookPart, String photo) {
        this.id = userId;
        this.name = userName;
        this.mail = mail;
        this.password = password;
        this.uploadPosts = uploadPosts;
        this.comments = comments;
        this.playlists = playlists;
        this.photoPath=photo;
    }

    public Users() {

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

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public List<Post> getUploadPosts() {
        return uploadPosts;
    }

    public void setUploadPosts(List<Post> uploadPosts) {
        this.uploadPosts = uploadPosts;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<PlayList> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(List<PlayList> playlists) {
        this.playlists = playlists;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
