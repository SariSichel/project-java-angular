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

addPostToPlayListOnServer(playListId:Number, postId:Number):Observable<PlayList>{
  return this._httpClient.post<PlayList>(`http://localhost:8080/api/PlayList/addPostToPlayList/${playListId}/${postId}`,{}, {withCredentials: true, responseType: 'text' as 'json'})
}

// addPlayListOnServer(playList:PlayList):Observable<PlayList>{
//   return this._httpClient.post<PlayList>(`http://localhost:8080/api/PlayList/addPlayList`,playList, {withCredentials: true})
// }
addPlayListOnServer(playList: any): Observable<PlayList> {
  return this._httpClient.post<PlayList>(
    `http://localhost:8080/api/PlayList/addPlayList`,
    playList,
    { withCredentials: true }
  );
}

removePostFromPlayListOnServer(playListId:Number, postId:Number):Observable<any>{
  return this._httpClient.delete<any>(`http://localhost:8080/api/Post/removePostFromPlayList/${playListId}/${postId}`,{withCredentials: true})  
}

deletePlayListFromServer(playListId:number):Observable<any>{
  return this._httpClient.delete<any>(`http://localhost:8080/api/PlayList/deletePlaylistById/${playListId}`,{withCredentials: true})  
}
}
