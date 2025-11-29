//gemini
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostListComponent } from "../post-list/post-list.component";
import { CategoryListComponent } from "../category-list/category-list.component";
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // נדרש עבור async pipe

@Component({
 selector: 'app-home',
 standalone: true, imports: [PostListComponent, CategoryListComponent, CommonModule],
 templateUrl: './home.component.html',
 styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  message:string=""

 // 🟢 המשתנה הוא כעת Observable שמחזיק את סטטוס ההתחברות
 public isLoggedIn$: Observable<boolean>; 

 constructor(private router: Router, private _userService: UserService) {
  // נרשמים ל-Observable של השירות
  this.isLoggedIn$ = this._userService.isLoggedIn$;
 }

 // אין צורך ב-ngOnInit לבדיקת סטטוס, כי ה-Service מטפל בזה
ngOnInit(): void {
 }

addPost(): void {
 this.router.navigate(['add-post']);
 }

myPosts(): void {
  // כאן נניח שיש דרך לקבל את ה-ID של המשתמש הנוכחי, לדוגמה דרך שירות משתמש
  const userId = 99; // יש להחליף בקבלת ה-ID האמיתי
  this.router.navigate(['my-posts', userId]);
 }

personalArea():void{
    // כאן נניח שיש דרך לקבל את ה-ID של המשתמש הנוכחי, לדוגמה דרך שירות משתמש
    const userId = 99; // יש להחליף בקבלת ה-ID האמיתי
    this.router.navigate(['personal-area', userId])
}

myPlayLists(){
    // כאן נניח שיש דרך לקבל את ה-ID של המשתמש הנוכחי, לדוגמה דרך שירות משתמש
    const userId = 99; // יש להחליף בקבלת ה-ID האמיתי
    this.router.navigate(['my-play-lists', userId])
}

signIn(): void {
  this.router.navigate(['sign-in'])
 }

signOut(): void {
 this._userService.signOut().subscribe({ next: () => {
  this.message="signed out successfully"
//  alert("Signed out successfully");
 this.router.navigate(['home']);
 // 🟢 השירות (UserService) כבר עדכן את המצב ל-false!
 },
 error: (err) => {
 console.error(err);
 this.message
 }
}) 
}

signUp(): void {
 this.router.navigate(["sign-up"])
}

}
