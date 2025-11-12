import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Post from '../model/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  constructor(private _httpClient:HttpClient) { }

  public postsList: Post[]=[

  ]

  //פונקציה שמחזירה את כל הפוסטים מהשרת
  getPostsFromServer():Observable<Post[]>{
    return this._httpClient.get<Post[]>(`http://localhost:8080/api/Post/getPosts`)
  }


    addPostToServer(formData: FormData): Observable<Post> {
    return this._httpClient.post<Post>(`http://localhost:8080/api/Post/addPost`, formData, {withCredentials: true});
  }

}
