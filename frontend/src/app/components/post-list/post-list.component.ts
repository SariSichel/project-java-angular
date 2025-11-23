import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import Post from '../../model/post.model';
import Comment from '../../model/comments.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  public postsList!:Post[]

constructor(private _postService: PostsService, private router:Router){}

  ngOnInit(): void{
    this._postService.getPostsFromServer().subscribe({
      next: (res)=>{
        this.postsList=res
      },
      error:(err)=>{

      }
    })
  }



    //לעבור לעמוד של פוסט מסויים עם מזהה
  seeFullPost(id:Number){
    this.router.navigate(['full-post', id]);
  }

}
