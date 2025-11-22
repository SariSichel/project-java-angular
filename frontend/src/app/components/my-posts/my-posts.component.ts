import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import Post from '../../model/post.model';

@Component({
  selector: 'app-my-posts',
  imports: [],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent {
  
public posts!:Post[];

constructor(private _postService:PostsService, private route:ActivatedRoute, private router: Router){}

ngOnInit():void{

  var id:Number;
  this.route.params.subscribe((params)=>{
  id=params['id'];

  this._postService.getPostsByUserIdFromServer(id).subscribe({
    next:(res)=>{
      this.posts=res;
    },
    error:(err)=>{
      console.error(err);
    }   
})
})
}

updatePost(postId: Number){
  this.router.navigate(['update-post', postId]);
}

goToPost(postId: Number){
  this.router.navigate(['full-post', postId]);
}

}
