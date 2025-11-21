import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import Post from '../../model/post.model';

@Component({
  selector: 'app-play-list',
  imports: [],
  templateUrl: './play-list.component.html',
  styleUrl: './play-list.component.css'
})
export class PlayListComponent {
public posts!:Post[];
  constructor(private route:ActivatedRoute, private postService:PostsService, private router:Router) {}

  ngOnInit() {
    var id:number;
     this.route.params.subscribe((params)=>{
      id=params['id'];
this.postService.getPostByIdFromServer(id).subscribe({
  next:(res)=>{
// this.posts=res;
  }
})
     })
  }


      //לעבור לעמוד של פוסט מסויים עם מזהה
  seeFullPost(id:Number){
    this.router.navigate(['full-post', id]);
  }

}
