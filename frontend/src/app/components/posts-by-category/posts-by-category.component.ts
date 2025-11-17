import { Component } from '@angular/core';
import Post from '../../model/post.model';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-by-category',
  imports: [],
  templateUrl: './posts-by-category.component.html',
  styleUrl: './posts-by-category.component.css'
})
export class PostsByCategoryComponent {
public postsByCategoryList!:Post[]

constructor(private postService:PostsService, private route:ActivatedRoute, private router:Router){}
ngOnInit():void{
  var id:Number;
  this. route.params.subscribe((params)=>{
    id=params['id'];
    this.postService.getPostsByCategoryFromServer(id).subscribe({
      next:(res)=>{
        this.postsByCategoryList=res;
      },
      error:(err)=>{
        console.error(err);
      }
    })
  })
}

  seeFullPost(id:Number){
    this.router.navigate(['full-post', id]);
  }


}
