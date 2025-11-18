package com.example.project.model;

import jakarta.persistence.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Post {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    @Min(value = 2, message = "name must be at least 2 chars")
    @Max(value = 50, message = "name must be at most 50 chars")
    private String name;
    private String description;
    private String lyrics;
    @NotNull
    private String audioPath;
    private LocalDate uploadDate;
    private LocalDate updateDate;
    @NotNull
    private String photoPath;
    private String usersTookPart;

    //relations
   @ManyToOne
    private Users user;

   @NotNull
   @ManyToOne
   private Category category;

   @OneToMany(mappedBy = "post")
   private List<Comment> comments;


    public Post(Long Id, String Name, String description, String lyrics, LocalDate uploadDate, LocalDate updateDate, Users user, Category category, String usersTookPart, List<Comment> comments, PlayList playList, String audioPath, String photoPath) {
        this.id = Id;
        this.name = Name;
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
