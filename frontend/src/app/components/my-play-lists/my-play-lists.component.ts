import { Component } from '@angular/core';
import PlayList from '../../model/playList.model';
import { PlayListService } from '../../services/play-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-play-lists',
  imports: [],
  templateUrl: './my-play-lists.component.html',
  styleUrl: './my-play-lists.component.css'
})
export class MyPlayListsComponent {
public message:string=""
  public playLists!:PlayList[]
  public PlayListIdToDelete: number | null = null;
  
  constructor(private playListService: PlayListService, private route:ActivatedRoute, private router: Router){}

  ngOnInit():void{
    var id:Number;
    this.route.params.subscribe((params)=>{
    id=+params['id'];
    
    this.playListService.getPlayListsByUserIdFromServer(id).subscribe({
      next:(res)=>{
          console.log('PlayLists received:', res);
        this.playLists=res;
      },
      error:(err)=>{
        console.error(err);
      }
  })
  })
  }

  goToPlayList(id: number){
     console.log('Navigating to playlist with id:', id); 
    this.router.navigate(['play-list', id]);
  }

  deletePlayList(playListId: number): void {
    this.PlayListIdToDelete = playListId; // שמירת ה-ID של הפוסט שרוצים למחוק
  }

  cancelDelete(): void {
    this.PlayListIdToDelete = null; // איפוס ה-ID של הפוסט שמיועד למחיקה
  } 

  okDeletePost(playListId: number): void {
    this.playListService.deletePlayListFromServer(playListId).subscribe({
      next: (res) => {
        this.message
        // alert("PlayList deleted successfully!");
        // רענון רשימת הפלייליסטים לאחר המחיקה
        this.playLists = this.playLists.filter(pl => pl.id !== playListId);
        this.PlayListIdToDelete = null; // איפוס ה-ID של הפוסט שמיועד למחיקה
      },
      error: (err) => {
        console.error('Error deleting PlayList:', err);
        this.message = "Failed to delete PlayList";
      }
    });
  }
}
