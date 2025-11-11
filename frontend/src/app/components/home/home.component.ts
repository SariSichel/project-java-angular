import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostListComponent } from "../post-list/post-list.component";
import { CategoryListComponent } from "../category-list/category-list.component";

@Component({
  selector: 'app-home',
  imports: [PostListComponent, CategoryListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router:Router) { }

  addPost(){
    this.router.navigate(["add-post"]);
  }
  signIn(){
    this.router.navigate(["sign-in"])
  }
  signOut(){
    //להתחבר לסיין אוט של השרת

  }
  signUp(){
    this.router.navigate(["sign-up"])

  }
}
