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
  public playLists!:PlayList[]
  
  constructor(private playListService: PlayListService, private route:ActivatedRoute, private router: Router){}

  ngOnInit():void{
    var id:Number;
    this.route.params.subscribe((params)=>{
    id=params['id'];
    this.playListService.getPlayListsByUserIdFromServer(id).subscribe({
      next:(res)=>{
        this.playLists=res;
      },
      error:(err)=>{
        console.error(err);
      }
  })
  })

  }


  goToPlayList(id: Number){
    this.router.navigate(['play-list', id]);
  }
}
