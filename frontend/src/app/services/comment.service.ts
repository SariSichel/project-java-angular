import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Comments from '../model/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _httpClient:HttpClient) { }

  getCommentsByPostId(id:Number):Observable<Comments[]>{
    return this._httpClient.get<Comments[]>(`http://localhost:8080/api/Comment/getCommentsByPostId/${id}`, {withCredentials: true})
  }

  // addCommentToServer(formData:FormData):Observable<Comment>{
  //   return this._httpClient.post<Comment>(`http://localhost:8080/api/Comment/addComment`, formData, {withCredentials: true});
  // }
  addCommentToServer(comment: Comments): Observable<Comment> {
  return this._httpClient.post<Comment>(
    `http://localhost:8080/api/Comment/addComment`, 
    comment, 
    {withCredentials: true}
  );
}
}
