
//gemini

import { Component } from '@angular/core';
import Post from '../../model/post.model';
import { FormsModule } from '@angular/forms';
import Category from '../../model/category.model';
import { CategoriesService } from '../../services/categories.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-add-post',
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})

export class AddPostComponent {

  public categoriesList:Category[]=[]
  public selectedPhoto: File | null = null;
  public selectedAudio: File | null = null;
  public message: string=""

  constructor(private _categoryService: CategoriesService,
              private _postService: PostsService) { }

  ngOnInit():void{
    this._categoryService.getCategoriesFromServer().subscribe({
      next: (res)=>{
        this.categoriesList=res
      },
      error: (err)=>{
      }
    })
  }

  public newPost: Post={
    id:-1,
    name:"",
    description:"",
    lyrics:"",
    audioPath:"",
    uploadDate:new Date(),
    photoPath:"",
    //צריך לתפוס יוזר מהלוקאל סטוראג
    user:{id:99,name:"",mail:"",photoPath:""},
    category:this.categoriesList[0],
    usersTookPart:"",
    comments:[]
  }

  onFileSelected(event: any, type: 'photo' | 'audio') {
    const file = event.target.files[0];
    if (type === 'photo') this.selectedPhoto = file;
    else this.selectedAudio = file;
  }
 
  addPost() {
    if (!this.selectedPhoto || !this.selectedAudio) {
   this.message = "Please select both photo and audio files before uploading";
      return;
    }

    const formData = new FormData();

    // 1. מוסיפים קבצים (ה-FormData מזהה אוטומטית שהם קבצים)
    formData.append("photo", this.selectedPhoto);
    formData.append("audio", this.selectedAudio);

    // 2. מוסיפים את אובייקט הפוסט כמחרוזת JSON בתוך Blob, 
    // **ומוסיפים את ה-Content-Type הנכון.**

    const postBlob = new Blob([JSON.stringify({
      name: this.newPost.name,
      description: this.newPost.description,
      lyrics: this.newPost.lyrics,
      uploadDate: this.newPost.uploadDate,
      user: this.newPost.user,
      category: this.newPost.category,
      usersTookPart: this.newPost.usersTookPart,
      comments: this.newPost.comments
    })], { type: 'application/json' }); // <--- התיקון הקריטי

    formData.append("post", postBlob);

    // שליחה לשרת
    this._postService.addPostToServer(formData).subscribe({
      next: (res) => {
        this.message = "Post uploaded successfully!";
      },
      error: (err) => {
        console.error(err);
        this.message = "Failed to upload post";
      }
    });
  }
}




