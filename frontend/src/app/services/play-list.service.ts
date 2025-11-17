import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PlayList from '../model/playList.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

constructor(private _httpClient:HttpClient) { }

getPlayListsByUserIdFromServer(id:Number):Observable<PlayList[]>{
  return this._httpClient.get<PlayList[]>(`http://localhost:8080/api/PlayList/getPlayListsByUserId/${id}` , {withCredentials: true})
}


}
