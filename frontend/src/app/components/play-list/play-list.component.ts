import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import Post from '../../model/post.model';
import { PlayListService } from '../../services/play-list.service';

@Component({
  selector: 'app-play-list',
  imports: [],
  templateUrl: './play-list.component.html',
  styleUrl: './play-list.component.css'
})
export class PlayListComponent {
message:string=""
  public posts!:Post[];
  public postIdToDelete: number | null = null; // שמירת ה-ID של הפוסט שמיועד למחיקה
  public playListId:number=0;

  constructor(private route:ActivatedRoute, private postService:PostsService, private router:Router,private playListService:PlayListService) {}

  ngOnInit() {
    
    this.route.params.subscribe((params)=>{
    this.playListId= +params['id'];

  this.postService.getPostsByPlayListIdFromServer(this.playListId).subscribe({
      next:(res)=>{
        this.posts=res;
     },
      error:(err)=>{
    }
    });
     })
  }

  deletePost(postId: number): void {
    this.postIdToDelete = postId; // שמירת ה-ID של הפוסט שרוצים למחוק
  }

  cancelDelete(): void {
    this.postIdToDelete = null; // ביטול המחיקה
  }

  okDeletePost(postId: number): void {
    this.playListService.removePostFromPlayListOnServer(this.playListId,postId).subscribe({
      next: (res) => {  
        this.message="Post removed from PlayList successfully!"
        this.postIdToDelete = null; // איפוס לאחר מחיקה מוצלחת
        this.posts = this.posts.filter(p => p.id !== postId); // רענון הרשימה לאחר המחיקה
      },
      error: (err) => {
        console.error("Failed to delete post:", err); 
        this.message="Failed to remove post from PlayList"
        this.postIdToDelete = null;
      } 
    });
  }
      //לעבור לעמוד של פוסט מסויים עם מזהה
  seeFullPost(id:Number){
    this.router.navigate(['full-post', id]);
  }

}
