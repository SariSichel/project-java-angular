package com.example.project.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Post {
    @Id
    @GeneratedValue
    private int Id;
    private String Name;
    private String description;
    private String lyrics;
    private String audioPath;
    private LocalDate uploadDate;
    private LocalDate updateDate;
    private String photoPath;
    private String usersTookPart;

    //relations
   @ManyToOne
    private Users user;

   @ManyToOne
   private Category category;

   @OneToMany(mappedBy = "post")
   private List<Comment> comments;


    public Post(int Id, String Name, String description, String lyrics, LocalDate uploadDate, LocalDate updateDate, Users user, Category category, String usersTookPart, List<Comment> comments, PlayList playList, String audioPath, String photoPath) {
        this.Id = Id;
        this.Name = Name;
        this.description = description;
        this.lyrics = lyrics;
        this.uploadDate = uploadDate;
        this.updateDate = updateDate;
        this.user = user;
        this.category = category;
        this.usersTookPart = usersTookPart;
        this.comments = comments;
        this.audioPath= audioPath;
        this.photoPath=photoPath;
    }

    public Post() {
    }

    public int getId() {
        return Id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getAudioPath() {
        return audioPath;
    }

    public void setAudioPath(String audioPath) {
        this.audioPath = audioPath;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getUsersTookPart() {
        return usersTookPart;
    }

    public void setUsersTookPart(String usersTookPart) {
        this.usersTookPart = usersTookPart;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

}
