import { Component } from '@angular/core';
import Category from '../../model/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  
  public categoriesList!:Category[]

  constructor(private _categoryService: CategoriesService){}

  ngOnInit():void{
    this._categoryService. getCategoriesFromServer().subscribe({
      next: (res)=>{
        this.categoriesList=res
      },
      error: (err)=>{
        
      }
    })
  }

}
