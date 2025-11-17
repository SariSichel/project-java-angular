import { Component } from '@angular/core';
import Category from '../../model/category.model';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  
  public categoriesList!:Category[]

  constructor(private _categoryService: CategoriesService, private router:Router){}

  ngOnInit():void{
    this._categoryService. getCategoriesFromServer().subscribe({
      next: (res)=>{
        this.categoriesList=res
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }

  categoryPosts(id:Number){
    this.router.navigate(['posts-by-category', id])
  }

}
