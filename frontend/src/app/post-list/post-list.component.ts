import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import Post from '../model/post.model';
import Comment from '../model/comment.model';

@Component({
  selector: 'app-post-list',
  imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  public postsList!:Post[]

constructor(private _postService: PostsService){}

  ngOnInit(): void{
    this._postService.getPostsFromServer().subscribe({
      next: (res)=>{
        this.postsList=res
      },
      error:(err)=>{

      }
    })
  }

  //   getPost(index: number): string {
  //   return this.postsList[index].name + ": " 
  //   + this.postsList[index].description+", "
  //   + this.postsList[index].lyrics
  //   + this.postsList[index].audio+", "
  //   + this.postsList[index].uploadDate+", "
  //   + this.postsList[index].updateDate+", "
  //   + this.postsList[index].photoPath+", "
  //   + this.postsList[index].user+", "
  //   + this.postsList[index].category + ", " 
  // }

    //לעבור לעמוד של פוסט מסויים עםן מזהה
  seeFullPost(){

  }

}
