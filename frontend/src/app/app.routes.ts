import { Routes } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { PostsByCategoryComponent } from './components/posts-by-category/posts-by-category.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import { MyPlayListsComponent } from './components/my-play-lists/my-play-lists.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { FullPostComponent } from './components/full-post/full-post.component';


export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"add-post", component:AddPostComponent},
    {path:"home", component:HomeComponent},
    {path: "sign-in", component:SignInComponent},
    {path: "sign-up", component:SignUpComponent},
    {path: "full-post/:id", component:FullPostComponent},
    {path: "personal-area/:id", component:PersonalAreaComponent},
    {path: "posts-by-category/:id", component:PostsByCategoryComponent},
    {path: "play-list/:id", component:PlayListComponent},
    {path:"my-play-lists/:id", component:MyPlayListsComponent},
    {path:"update-post/:id", component:UpdatePostComponent},
    {path:"my-posts/:id", component:MyPostsComponent}

];
