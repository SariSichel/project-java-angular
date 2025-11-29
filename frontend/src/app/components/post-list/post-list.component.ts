
import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import Post from '../../model/post.model';
import Comment from '../../model/comments.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // ⭐ הוסף את זה
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  public postsList!: Post[]
  public allPosts!: Post[] // ⭐ שמור את כל הפוסטים המקוריים
  public searchKeyword: string = '' // ⭐ למילת החיפוש
  public isSearching: boolean = false // ⭐ סטטוס חיפוש

  constructor(private _postService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this._postService.getPostsFromServer().subscribe({
      next: (res) => {
        this.postsList = res
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  // ⭐ פונקציה חדשה לחיפוש
  onSearch(): void {
    if (this.searchKeyword.trim() === '') {
      this.postsList = this.allPosts // אם אין חיפוש, הצג הכל
      return
    }

    this.isSearching = true
    this._postService.searchPosts(this.searchKeyword).subscribe({
      next: (results) => {
        this.postsList = results
        this.isSearching = false
      },
      error: (err) => {
        console.error('Search error:', err)
        this.isSearching = false
      }
    })
  }

  // ⭐ פונקציה למחיקת החיפוש
  clearSearch(): void {
    this.searchKeyword = ''
    this.postsList = this.allPosts // החזר את כל הפוסטים
  }

  seeFullPost(id: Number) {
    this.router.navigate(['full-post', id])
  }

    getStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '⭐'.repeat(fullStars) + 
           (hasHalfStar ? '✨' : '') + 
           '☆'.repeat(emptyStars);
  }

  sortByRating(): void {
    this._postService.getPostsSortedByRating().subscribe({
      next: (res) => {
                console.log("sort by rating");

        this.postsList = res
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  sortByDate(): void {
this._postService.getPostsSortedByDate().subscribe({
      next: (res) => {
        console.log("sort by date");
        
        this.postsList = res
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onSortChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const sortType = selectElement.value;
  
  if (sortType === 'rating') {
    this.sortByRating();
  } else if (sortType === 'date') {
    this.sortByDate();
  }
}
}