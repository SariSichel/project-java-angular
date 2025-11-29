

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import Post from '../../model/post.model'; 

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit {
public message:string=""
  public posts!: Post[];
  public userId!: number; 
  public postIdToDelete: number | null = null; // שמירת ה-ID של הפוסט שמיועד למחיקה

  constructor(
    private _postService: PostsService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.userId = +idParam;
      this.loadPosts(this.userId);
    } else {
        console.error("חסר ID משתמש בנתיב.");
    }
  }

  private loadPosts(id: number): void {
    this._postService.getPostsByUserIdFromServer(id).subscribe({
      next: (res) => {
        this.posts = res;
      },
      error: (err) => {
        console.error("שגיאה בטעינת פוסטים:", err);
      }
    });
  }

  updatePost(postId: number): void {
    this.router.navigate(['update-post', postId]);
  }

  goToPost(postId: number): void {
    this.router.navigate(['full-post', postId]);
  }

  deletePost(postId: number): void {
    this.postIdToDelete = postId; // שמירת ה-ID של הפוסט שרוצים למחוק
  }

  cancelDelete(): void {
    this.postIdToDelete = null; // ביטול המחיקה
  }

  okDeletePost(postId: number): void {
    this._postService.deletePostFromServer(postId).subscribe({
      next: (res) => { 
        this.message="Post deleted successfully!" 
        this.postIdToDelete = null; // איפוס לאחר מחיקה מוצלחת
        this.loadPosts(this.userId);
      },
      error: (err) => {
        console.error("Failed to delete post:", err); 
        this.message="Failed to delete post"
        this.postIdToDelete = null;
      } 
    });
  }
}