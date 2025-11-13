import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../model/userSignUp.model';
import { Observable } from 'rxjs';
import UserSignIn from '../model/userSignIn.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private baseUrl = 'http://localhost:8080/api/User';

  constructor(private _httpClient: HttpClient){}

  // Sign up with FormData (user + photo)
  signUp(formData: FormData): Observable<User> {
    // const formData = new FormData();
    // formData.append('photo', photo);
    // formData.append('userSignUp', new Blob([JSON.stringify(user)], { type: 'application/json' }));

    return this._httpClient.post<User>(`http://localhost:8080/api/User/signUp`, formData, {withCredentials: true});
  }

  // Sign in with username + password
signIn(userSignIn: UserSignIn): Observable<string> {
  return this._httpClient.post(`http://localhost:8080/api/User/signin`, userSignIn, {
    responseType: 'text',  // <-- חשוב!
    withCredentials: true
  });
}

  
  signOut(): Observable<ArrayBuffer> {
    return this._httpClient.post<ArrayBuffer>(`http://localhost:8080/api/User/signout`,null, {withCredentials: true});
  }
}
