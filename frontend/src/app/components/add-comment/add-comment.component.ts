
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

  hoverRating: number = 0;
  message: string=""

  constructor(private route: ActivatedRoute, private commentService: CommentService) { }

  public newComment: Comments = {
    id: 0,                   
    text: "",
    rating: 0,
    updateDate: new Date(),
    //צריך לתפוס יוזר מהלוקאל סטוראג
    user: {id: 99, name: "", mail: "", photoPath: ""},
    postId: 0 
  };

  setRating(rating: number) {
    this.newComment.rating = rating;
  }

  addComment() {
    var id: number;
    this.route.params.subscribe((params) => {
      id = params['id'];
      this.newComment.postId = id;
    });

    // שלח את אובייקט התגובה ישירות כ-JSON
    this.commentService.addCommentToServer(this.newComment).subscribe({
      next: (res) => {
        this.message = "Comment added successfully!";
      },
      error: (err) => {
        console.error(err);   
        this.message = "Failed to add comment.";
      }
    });
  }
}