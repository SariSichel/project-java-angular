import { Component } from '@angular/core';
import Post from '../model/post.model';
import { FormsModule } from '@angular/forms';
import Category from '../model/category.model';
import { CategoriesService } from '../services/categories.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-add-post',
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})

export class AddPostComponent {

  public categoriesList:Category[]=[]

  constructor(private _categoryService: CategoriesService,private _postService: PostsService) { }

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
    audio:"",
    uploadDate:new Date(),
    photo:"",
    //צריך לתפוס יוזר מהלוקאל סטוראג
     user:{id:1,name:"",mail:"",photoPath:""},
     category:this.categoriesList[0],
    usersTookPart:"",
    comments:[]
  }

  addPost(post:Post){
    this._postService.addPostToServer(this.newPost).subscribe({
      next:(res)=>{
      },
      error:(err)=>{
      }
    }) 
}
}