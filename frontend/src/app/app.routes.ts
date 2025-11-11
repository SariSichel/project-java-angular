import { Routes } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"add-post", component:AddPostComponent},
    {path:"home", component:HomeComponent},
    {path: "sign-in", component:SignInComponent},
    {path: "sign-up", component:SignUpComponent},


];
