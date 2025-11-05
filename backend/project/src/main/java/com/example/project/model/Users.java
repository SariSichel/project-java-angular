package com.example.project.model;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Users {
    @Id
    @GeneratedValue
    private int Id;
    private String Name;
    private String mail;
    private String password;
    private String photoPath;

    @OneToMany(mappedBy = "user")
    private List<Post> uploadPosts;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @OneToMany(mappedBy = "user")
    private List<PlayList> playlists;



    public Users(int userId, String userName, String mail, String password, List<Post> uploadPosts, List<Comment> comments, List<PlayList> playlists, List<Post> postsTookPart, String photo) {
        this.Id = userId;
        this.Name = userName;
        this.mail = mail;
        this.password = password;
        this.uploadPosts = uploadPosts;
        this.comments = comments;
        this.playlists = playlists;
        this.photoPath=photo;
    }

    public Users() {

    }

    public int getUserId() {
        return Id;
    }

    public void setUserId(int userId) {
        this.Id = userId;
    }

    public String getUserName() {
        return Name;
    }

    public void setUserName(String userName) {
        this.Name = userName;
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

    public List<Post> getUploadPosts() {
        return uploadPosts;
    }

    public String getPhotoPath() {
        return photoPath;
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


    public void setPhotoPath(String photo) {
        this.photoPath = photo;
    }
}
