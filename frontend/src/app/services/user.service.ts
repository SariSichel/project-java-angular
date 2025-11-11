import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private _httpClient: HttpClient){}

  signUp():Observable<User>{
    return this._httpClient.post<User>(`http://localhost:8080/api/User/signUp`)
  }

    signIn():Observable<User>{
    return this._httpClient.post<User>(`http://localhost:8080/api/User/signin`)
  }

  signOut():Observable<User>{
    return this._httpClient.post<User>(`http://localhost:8080/api/User/signout`)
  }
}
