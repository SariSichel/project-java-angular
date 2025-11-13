import { Component } from '@angular/core';
import Post from '../../model/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-full-post',
  imports: [],
  templateUrl: './full-post.html',
  styleUrl: './full-post.css',
})
export class FullPostComponent {

constructor(private route: ActivatedRoute, private postService:PostsService) { }
  //המשתנה שיוחזר מהשרת
public post!:Post

ngOnInit(): void {
  var id:number;
  this.route.params.subscribe((params) => {
    id = params['id'];
    this.postService.getPostByIdFromServer(id).subscribe({
      next:(res)=>{
        this.post=res;
      },
      error:(err)=>{
        
      }
    })
  });

}
//נשלח לפונקציה את הפוסט עצמו ונשלוף את השדות להראות
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
}
