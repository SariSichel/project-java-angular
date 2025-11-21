// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import User from '../model/userSignUp.model';
// import { Observable } from 'rxjs';
// import UserSignIn from '../model/userSignIn.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   // private baseUrl = 'http://localhost:8080/api/User';
//   // private baseUrl = 'http://localhost:8080/api/auth';


//   constructor(private _httpClient: HttpClient){}

//   // Sign up with FormData (user + photo)
//   signUp(formData: FormData): Observable<User> {
//     // const formData = new FormData();
//     // formData.append('photo', photo);
//     // formData.append('userSignUp', new Blob([JSON.stringify(user)], { type: 'application/json' }));

//     return this._httpClient.post<User>(`http://localhost:8080/api/User/signUp`, formData, {withCredentials: true});
//   }

//   // Sign in with username + password
// signIn(userSignIn: UserSignIn): Observable<any> {
//   return this._httpClient.post(`http://localhost:8080/api/User/signin`, userSignIn, {
//     responseType: 'text',  
//     withCredentials: true
//   });
// }
  
//   signOut(): Observable<string> {
//     return this._httpClient.post(`http://localhost:8080/api/User/signout`,null, {
//     responseType: 'text',  
//     withCredentials: true
//   });
//   }

//   //   // פונקציה שבודקת אם המשתמש מחובר
//   // isLoggedIn(): Observable<boolean> {
//   //   return this._httpClient.get<boolean>(`${this.baseUrl}/status`, { withCredentials: true });
//   // }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../model/userSignUp.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import UserSignIn from '../model/userSignIn.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/User'; 

  // 🟢 BehaviorSubject לניהול המצב
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  // 🟢 Observable שאליו הקומפוננטות יירשמו
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private _httpClient: HttpClient){
    // בדיקה ראשונית של המצב כשנטען השירות
    this.checkLoginStatus();
  }

  // פונקציה לעדכון מצב ההתחברות גלובלית
  setLoggedIn(status: boolean): void {
    this._isLoggedIn.next(status);
  }


  // Sign in with username + password

// signIn(userSignIn: UserSignIn): Observable<string> {
//   return this._httpClient.post(`http://localhost:8080/api/User/signin`, userSignIn, {
//     responseType: 'text',  // <-- חשוב!
//     withCredentials: true
//   });
// }



 // 🟢 פונקציה לבדיקת סטטוס מול השרת (כמו בגרסה הראשונה שצירפת)
 private checkLoginStatus(): void { this._httpClient.get<boolean>(`${this.apiUrl}/status`, { withCredentials: true }).subscribe({
   next: (status) => this.setLoggedIn(status),
    error: () => this.setLoggedIn(false) // אם יש שגיאה, מניחים שלא מחובר
  });
 }

  
 signUp(formData: FormData): Observable<User> {
  // לאחר הרשמה מוצלחת וקבלת עוגייה, נעדכן את הסטטוס
  return this._httpClient.post<User>(`${this.apiUrl}/signUp`, formData, {withCredentials: true}).pipe(
   tap(() => this.setLoggedIn(true)) 
  );
 }

 signIn(userSignIn: UserSignIn): Observable<any> {
  // לאחר כניסה מוצלחת וקבלת עוגייה, נעדכן את הסטטוס
  return this._httpClient.post(`${this.apiUrl}/signin`, userSignIn, {
   responseType: 'text', 
   withCredentials: true
  }).pipe(
   tap(() => this.setLoggedIn(true)) // 👈 עדכון מצב
  );
 }
 
 signOut(): Observable<string> {
  // לאחר יציאה מוצלחת, נעדכן את הסטטוס
  return this._httpClient.post(`${this.apiUrl}/signout`, null, {
   responseType: 'text', 
   withCredentials: true
  }).pipe(
   tap(() => this.setLoggedIn(false)) // 👈 עדכון מצב
  );
 }


getUserByIdFromServer(id: Number): Observable<User> {
  //לשים ניתוב לשרת
  return this._httpClient.get<User>(`http://localhost:8080/api/User/getUserById/${id}`, { withCredentials: true });
}

updateUser(user: FormData): Observable<User> {
  //לשים ניתוב לשרת
  return this._httpClient.put<User>(`http://localhost:8080/api/User/updateUser`, user, { withCredentials: true });  }

}
