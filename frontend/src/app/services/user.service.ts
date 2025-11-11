import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../model/userSignUp.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/User';

  constructor(private _httpClient: HttpClient){}

  // Sign up with FormData (user + photo)
  signUp(user: User, photo: File): Observable<User> {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('userSignUp', new Blob([JSON.stringify(user)], { type: 'application/json' }));

    return this._httpClient.post<User>(`${this.baseUrl}/signUp`, formData);
  }

  // Sign in with username + password
  signIn(user: { name: string, password: string }): Observable<string> {
    return this._httpClient.post<string>(`${this.baseUrl}/signin`, user, { withCredentials: true });
  }

  signOut(): Observable<string> {
    return this._httpClient.post<string>(`${this.baseUrl}/signout`, {}, { withCredentials: true });
  }
}
