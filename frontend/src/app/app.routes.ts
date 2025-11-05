import { Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"add-post", component:AddPostComponent},
    {path:"home", component:HomeComponent}
];
