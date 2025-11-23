import { Component } from '@angular/core';
import Post from '../../model/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommentService } from '../../services/comment.service';
//import Comment from "./comment.model"
import Comment from '../../model/comments.model'; // <-- הוסף את הייבוא הזה
import comments from '../../model/comments.model';
import Comments from '../../model/comments.model';
import { PlayListService } from '../../services/play-list.service';
import PlayList from '../../model/playList.model';

@Component({
  selector: 'app-full-post',
  imports: [],
  templateUrl: './full-post.html',
  styleUrl: './full-post.css',
})
export class FullPostComponent {
 playLists!:PlayList[]
 showPlayList:boolean=false
 selectedPlayListId!: number 
  constructor(private route: ActivatedRoute, private postService: PostsService, private commentService:CommentService, private playListService:PlayListService) { }
  //המשתנה שיוחזר מהשרת
  public post!: Post
  public audioUrl: string | null = null;


  getArray(n: number): number[] {
    return Array.from({length: n}, (_, i) => i);
  }

  ngOnInit(): void {
  var id: number;

  this.route.params.subscribe((params) => {
    id = params['id'];

    this.postService.getPostByIdFromServer(id).subscribe({
      next: (res) => {
        this.post = res;

        this.postService.getAudio(this.post.audioPath).subscribe({
          next: (audioBlob) => {
                this.audioUrl = URL.createObjectURL(audioBlob);  
                
          this.commentService.getCommentsByPostId(id).subscribe({
            next: (res)=>{
              this.post.comments=res;
            },
            error:(err)=>{

            }
          })
          },
          error: (err) => {
            // טיפול בשגיאת קבלת האודיו
            console.error('Error fetching audio:', err); 
          }
        });
      }, // <-- סוגר את בלוק next: של ה-getPostByIdFromServer
      error: (err) => {
        // טיפול בשגיאת קבלת הפוסט
        console.error('Error fetching post:', err);
      }
    }); // <-- סוגר את subscribe של ה-getPostByIdFromServer
  }); // <-- סוגר את subscribe של ה-route.params

}
  
addToPlayList(postId: number) {
this.showPlayList=!this.showPlayList;
this.playListService.getPlayListsByUserIdFromServer(99).subscribe({
  next:(res)=>{
    console.log('PlayLists for adding post:', res);
this.playLists=res;
  },
  error:(err)=>{}
})
  }
   onPlayListSelected(event: Event, postId: number) {
    const selectElement = event.target as HTMLSelectElement;
    const playListId = +selectElement.value; // המרה למספר
    
    if (playListId) {
      this.playListService.addPostToPlayListOnServer(playListId, postId).subscribe({
        next: (res) => {
          alert('Post added to playlist successfully!');
          this.showPlayList = false;
        },
        error: (err) => {
          console.error('Error adding post to playlist:', err);
          alert('Failed to add post to playlist');
        }
      });
    }
  }
}

function ngOnDestroy() {
  throw new Error('Function not implemented.');
}




