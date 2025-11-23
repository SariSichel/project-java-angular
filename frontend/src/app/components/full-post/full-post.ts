import { Component } from '@angular/core';
import Post from '../../model/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommentService } from '../../services/comment.service';
//import Comment from "./comment.model"
import Comment from '../../model/comments.model'; // <-- הוסף את הייבוא הזה
import comments from '../../model/comments.model';
import Comments from '../../model/comments.model';

@Component({
  selector: 'app-full-post',
  imports: [],
  templateUrl: './full-post.html',
  styleUrl: './full-post.css',
})
export class FullPostComponent {

  constructor(private route: ActivatedRoute, private postService: PostsService, private commentService:CommentService) { }
  //המשתנה שיוחזר מהשרת
  public post!: Post
  public audioUrl: string | null = null;


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

  // מומלץ לנקות את כתובת ה-URL המקומית כאשר הקומפוננטה נהרסת
  // ngOnDestroy(): void {
  //  if (this.audioUrl) {
  //     URL.revokeObjectURL(this.audioUrl);
  //   }
  // }
  
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
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

