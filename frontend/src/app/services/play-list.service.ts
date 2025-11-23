import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PlayList from '../model/playList.model';
import { Observable } from 'rxjs';
import Post from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

constructor(private _httpClient:HttpClient) { }

getPlayListsByUserIdFromServer(id:Number):Observable<PlayList[]>{
  return this._httpClient.get<PlayList[]>(`http://localhost:8080/api/PlayList/getPlayListsByUserId/${id}` , {withCredentials: true})
}

getPostsByPlayListIdFromServer(id:Number):Observable<Post[]>{
  return this._httpClient.get<Post[]>(`http://localhost:8080/api/PlayList/getPostsByPlayListId/${id}` , {withCredentials: true})
}

addPostToPlayListOnServer(playListId:Number, postId:Number):Observable<PlayList>{
  return this._httpClient.post<PlayList>(`http://localhost:8080/api/PlayList/addPostToPlayList/${playListId}/${postId}`,{}, {withCredentials: true, responseType: 'text' as 'json'})
}


}
