import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import Comments from '../../model/comments.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  imports: [FormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent {

constructor(private route: ActivatedRoute,private commentService:CommentService) { }

  public newComment: Comments = {
    id: 0,                   
    text: "",
    rating: 1,
    updateDate: new Date(),
    //צריך לתפוס יוזר מהלוקאל סטוראג
    user: {id: 99,name: "",mail: "",photoPath: ""},
    postId: 0 
  };

  // addComment() {
  //   var id: number;
  //   this.route.params.subscribe((params) => {
  //   id = params['id'];
  //   this.newComment.postId=id;});

  //   const formData = new FormData();

  //   const commentBlob = new Blob([JSON.stringify(this.newComment)], { type: 'application/json' });
  //   formData.append("comment", commentBlob);
  //   // שליחה לשרת
  //   // כאן יש להוסיף את הקוד לשליחת ה-FormData לשרת באמצעות שירות מתאים
  //   this.commentService.addCommentToServer(formData).subscribe({
  //     next: (res) => {
  //       alert("Comment added successfully!");
  //     },
  //     error: (err) => {
  //       console.error(err);   
  //       alert("Failed to add comment");
  //     }
  //   });
  // }

  addComment() {
  var id: number;
  this.route.params.subscribe((params) => {
    id = params['id'];
    this.newComment.postId = id;
  });

  // שלח את אובייקט התגובה ישירות כ-JSON
  this.commentService.addCommentToServer(this.newComment).subscribe({
    next: (res) => {
      alert("Comment added successfully!");
    },
    error: (err) => {
      console.error(err);   
      alert("Failed to add comment");
    }
  });
}
  }