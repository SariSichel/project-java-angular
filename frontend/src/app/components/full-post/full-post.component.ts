import { Component } from '@angular/core';
import PlayList from '../../model/playList.model';
import { PostsService } from '../../services/posts.service';
import { CommentService } from '../../services/comment.service';
import { PlayListService } from '../../services/play-list.service';
import { ActivatedRoute } from '@angular/router';
import Post from '../../model/post.model';


@Component({
  selector: 'app-full-post',
  imports: [],
  templateUrl: './full-post.component.html',
  styleUrl: './full-post.component.css'
})



export class FullPostComponent {

 playLists!:PlayList[]
 showPlayList:boolean=false
 selectedPlayListId!: number 
  constructor(private route: ActivatedRoute, private postService: PostsService, private commentService:CommentService, private playListService:PlayListService) { }
  //המשתנה שיוחזר מהשרת
  public post!: Post
  public audioUrl: string | null = null;
  public newPlayListClicked=false;
  public playList:PlayList={id:0,name:'',creationDate:new Date(),lastUpdated:new Date(),user:{id:99,name:'',mail:'',photoPath:''}};

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
newPlayList() {
  this.newPlayListClicked=true;
}

add(){
    const formData = new FormData();
    formData.append("playList", new Blob([JSON.stringify({name:this.playList.name,
                                                      creationDate:this.playList.creationDate
                                                      ,lastUpdated:this.playList.lastUpdated,
                                                      user:this.playList.user
                                                    })]));
    this.playListService.addPlayListOnServer(this.playList).subscribe({
      next: (res) => {
        alert("PlayList created successfully!");  
      },
      error: (err) => {
        console.error(err);
        alert("Failed to create PlayList");
      }
    });
}

}

function ngOnDestroy() {
  throw new Error('Function not implemented.');
}





