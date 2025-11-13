import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostListComponent } from "../post-list/post-list.component";
import { CategoryListComponent } from "../category-list/category-list.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [PostListComponent, CategoryListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router:Router, private _userService:UserService) { }

  addPost(){
    this.router.navigate(["add-post"]);
  }
  signIn(){
    this.router.navigate(["sign-in"])
  }
  signOut(){
    this._userService.signOut().subscribe({
      next:(res)=>{
        alert("Signed out successfully");
        this.router.navigate(["sign-in"])
      },
      error:(err)=>{
        console.error(err);
        alert("Failed to sign out");
      }
    })      
  }
  signUp(){
    this.router.navigate(["sign-up"])

  }
}
