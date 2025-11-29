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
    return this._httpClient.get<Post[]>(`http://localhost:8080/api/Post/getPosts`,{withCredentials: true})
  }
  addPostToServer(formData: FormData): Observable<Post> {
    return this._httpClient.post<Post>(`http://localhost:8080/api/Post/addPost`, formData, {withCredentials: true});
  }

  getPostByIdFromServer(postId:number):Observable<Post>{
    return this._httpClient.get<Post>(`http://localhost:8080/api/Post/getPostById/${postId}`,{withCredentials: true})
  }

  getAudio(audioPath:string):Observable<Blob>{
    return this._httpClient.get(`http://localhost:8080/api/Post/audio/${audioPath}`, { responseType: 'blob', withCredentials: true });
  }

  updatePost(data: FormData): Observable<Post> {
    return this._httpClient.put<Post>(`http://localhost:8080/api/Post/updatePost`, data,{withCredentials: true});
  }

  getPostsByCategoryFromServer(categoryId:Number):Observable<Post[]>{
    return this._httpClient.get<Post[]>(`http://localhost:8080/api/Post/getPostsByCategoryId/${categoryId}`,{withCredentials: true})
  }

  getPostsByUserIdFromServer(userId:Number):Observable<Post[]>{
    return this._httpClient.get<Post[]>(`http://localhost:8080/api/Post/getPostsByUserId/${userId}`,{withCredentials: true})
  } 

  getPostsByPlayListIdFromServer(playListId:Number):Observable<Post[]>{
    return this._httpClient.get<Post[]>(`http://localhost:8080/api/Post/getPostsByPlayListId/${playListId}` , {withCredentials: true})
  }

  deletePostFromServer(postId:number):Observable<any>{
    return this._httpClient.delete<any>(`http://localhost:8080/api/Post/deletePostById/${postId}`,{withCredentials: true})
  }


  searchPosts(keyword: string): Observable<Post[]> {
    return this._httpClient.get<Post[]>(
      `http://localhost:8080/api/Post/search?keyword=${keyword}`,
      { withCredentials: true }
    );
  }

getPostsSortedByRating(): Observable<Post[]> {
    return this._httpClient.get<Post[]>(
      `http://localhost:8080/api/Post/getPostsSortedByRating`,
      { withCredentials: true }
    );
  }
  getPostsSortedByDate(): Observable<Post[]> {
    return this._httpClient.get<Post[]>(
      `http://localhost:8080/api/Post/getPostsSortedByDate`,
      { withCredentials: true }
    );
  }

}






