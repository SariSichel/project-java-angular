import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getPostByIdFromServer(postId:number):Observable<Post>{
    return this._httpClient.get<Post>(`http://localhost:8080/api/Post/getPostById/${postId}`)
  }


}
  // addPostToServer(formData: FormData): Observable<Post> {
  //   // שולח עם cookies ל־JWT
  //   return this._httpClient.post<Post>(
  //     'http://localhost:8080/api/Post/addPost',
  //     formData,
  //     { withCredentials: true }
  //   );
  // }

// addPostToServer(formData: FormData): Observable<Post> {
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
//   });
//   return this._httpClient.post<Post>(`http://localhost:8080/api/Post/addPost`, formData, { headers, withCredentials: true });
// }




//   addPostToServer(formData: FormData): Observable<Post> {
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${this.authService.getToken()}` // מקבלים את הטוקן מהשירות שלך
//   });

//   return this._httpClient.post<Post>(
//     `http://localhost:8080/api/Post/addPost`,
//     formData,
//     { headers, withCredentials: true }
//   );
// }





