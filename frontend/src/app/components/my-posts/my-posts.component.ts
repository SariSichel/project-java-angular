// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { PostsService } from '../../services/posts.service';
// import Post from '../../model/post.model';

// @Component({
//   selector: 'app-my-posts',
//   imports: [],
//   templateUrl: './my-posts.component.html',
//   styleUrl: './my-posts.component.css'
// })
// export class MyPostsComponent {
  
// public posts!:Post[];

// constructor(private _postService:PostsService, private route:ActivatedRoute, private router: Router){}

// ngOnInit():void{

//   var id:Number;
//   this.route.params.subscribe((params)=>{
//   id=params['id'];

//   this._postService.getPostsByUserIdFromServer(id).subscribe({
//     next:(res)=>{
//       this.posts=res;
//     },
//     error:(err)=>{
//       console.error(err);
//     }   
// })
// })
// }

// updatePost(postId: Number){
//   this.router.navigate(['update-post', postId]);
// }

// goToPost(postId: Number){
//   this.router.navigate(['full-post', postId]);
// }

// }


//מהגמיני
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // נדרש ל-@if/@for
import { PostsService } from '../../services/posts.service';
// ודא שהמודלים נכונים בנתיב
import Post from '../../model/post.model'; 

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit {

  public posts!: Post[];
  // שימוש ב-number לטיפוסיות נכונה
  public userId!: number; 

  constructor(
    private _postService: PostsService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    // קריאת ה-ID של המשתמש מהנתיב (מניח שה-ID נשלח כפרמטר בנתיב)
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.userId = +idParam; // המרה ל-number
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

  // שימוש ב-number לטיפוסיות נכונה
  updatePost(postId: number): void {
    this.router.navigate(['update-post', postId]);
  }

  // שימוש ב-number לטיפוסיות נכונה
  goToPost(postId: number): void {
    this.router.navigate(['full-post', postId]);
  }
}