import { Component } from '@angular/core';
import PlayList from '../../model/playList.model';
import { PostsService } from '../../services/posts.service';
import { CommentService } from '../../services/comment.service';
import { PlayListService } from '../../services/play-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import Post from '../../model/post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-full-post',
  imports: [FormsModule, CommonModule],
  templateUrl: './full-post.component.html',
  styleUrl: './full-post.component.css'
})

export class FullPostComponent {

 playLists!:PlayList[]
 showPlayList:boolean=false
 selectedPlayListId!: number 
 
  constructor(private route: ActivatedRoute, private postService: PostsService, private commentService:CommentService, private playListService:PlayListService, private router:Router) { }
  //המשתנה שיוחזר מהשרת
  public post!: Post
  public audioUrl: string | null = null;
  public newPlayListClicked=false;
  public playList:PlayList={id:-1,
                            name:'',
                            creationDate:new Date(),
                            lastUpdated:new Date(),
                            user:{id:99,name:'',mail:'',photoPath:''}
                          };

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
  //  onPlayListSelected(event: Event, postId: number) {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const playListId = +selectElement.value; // המרה למספר
    
  //   if (playListId) {
  //     this.playListService.addPostToPlayListOnServer(playListId, postId).subscribe({
  //       next: (res) => {
  //         alert('Post added to playlist successfully!');
  //         this.showPlayList = false;
  //       },
  //       error: (err) => {
  //         console.error('Error adding post to playlist:', err);
  //         alert('Failed to add post to playlist');
  //       }
  //     });
  //   }
  // }
  onPlayListSelected(event: Event, postId: number) {
  const selectElement = event.target as HTMLSelectElement;
  const playListId = selectElement.value;
  
  // בדיקה אם בחרו "new" - ליצירת פלייליסט חדש
  if (playListId === 'new') {
    this.newPlayListClicked = true;
    return;
  }
  
  // המרה למספר רק אם זה לא "new" ולא ריק
  if (playListId && playListId !== '') {
    this.playListService.addPostToPlayListOnServer(+playListId, postId).subscribe({
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

// אפשר למחוק את הפונקציה הזו כי לא צריך אותה יותר
// newPlayList() {
//   this.newPlayListClicked=true;
// }
newPlayList() {
  this.newPlayListClicked=true;
}

// add(){
//     const formData = new FormData();
//     formData.append("playList", new Blob([JSON.stringify({name:this.playList.name,
//                                                       creationDate:this.playList.creationDate
//                                                       ,lastUpdated:this.playList.lastUpdated,
//                                                       user:this.playList.user
//                                                     })]));
//     this.playListService.addPlayListOnServer(this.playList).subscribe({
//       next: (res) => {
//         alert("PlayList created successfully!");  
//       },
//       error: (err) => {
//         console.error(err);
//         alert("Failed to create PlayList");
//       }
//     });
// }

// add(){
//   // אין צורך ב-FormData, שלח את האובייקט ישירות
//   this.playListService.addPlayListOnServer(this.playList).subscribe({
//     next: (res) => {
//       alert("PlayList created successfully!");
//       this.newPlayListClicked = false;
//       this.showPlayList = false;
//       // אופציונלי: הוסף את הפלייליסט החדש לרשימה
//       this.playLists.push(res);
//     },
//     error: (err) => {
//       console.error(err);
//       alert("Failed to create PlayList");
//     }
//   });
// }

// add() {
//   // הכן את האובייקט עם הנתונים הנדרשים בלבד
//   const newPlayList = {
//     name: this.playList.name,
//     creationDate: new Date().toISOString(),
//     lastUpdated: new Date().toISOString()
//     // אל תשלח את user - השרת ימלא אותו אוטומטית מה-Authentication
//   };
  
//   this.playListService.addPlayListOnServer(newPlayList).subscribe({
//     next: (res) => {
//       alert("PlayList created successfully!");
//       this.newPlayListClicked = false;
//       this.showPlayList = false;
//       // הוסף את הפלייליסט החדש לרשימה
//       this.playLists.push(res);
//     },
//     error: (err) => {
//       console.error('Error details:', err);
//       alert("Failed to create PlayList: " + (err.error?.message || err.message));
//     }
//   });
// }
// }
// בקובץ full-post.component.ts - פונקציה מתוקנת

add() {
  // בדיקה שהשם לא ריק
  if (!this.playList.name || this.playList.name.trim() === '') {
    alert("Please enter a playlist name");
    return;
  }

  console.log('Creating playlist with name:', this.playList.name);
  
  const newPlayList = {
    name: this.playList.name.trim(),
    creationDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };
  
  // שלב 1: צור את הפלייליסט
  this.playListService.addPlayListOnServer(newPlayList).subscribe({
    next: (createdPlayList) => {
      console.log('Playlist created:', createdPlayList);
      
      // שלב 2: הוסף את הפוסט לפלייליסט החדש
      this.playListService.addPostToPlayListOnServer(createdPlayList.id, this.post.id).subscribe({
        next: (res) => {
          alert("PlayList created and post added successfully!");
          this.newPlayListClicked = false;
          this.showPlayList = false;
          
          // אתחל מחדש את הטופס
          this.playList.name = '';
          
          // רענן את רשימת הפלייליסטים
          this.playListService.getPlayListsByUserIdFromServer(99).subscribe({
            next: (lists) => {
              this.playLists = lists;
            }
          });
        },
        error: (err) => {
          console.error('Error adding post to new playlist:', err);
          alert("Playlist created but failed to add post");
        }
      });
    },
    error: (err) => {
      console.error('Error creating playlist:', err);
      alert("Failed to create PlayList. Check console for details.");
    }
  });
}

addComment(id:number) {
  this.router.navigate(['add-comment', id]);
}

}

function ngOnDestroy() {
  throw new Error('Function not implemented.');
}



