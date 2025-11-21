import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CategoryName from '../model/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient:HttpClient) { }

  public categoriesList: CategoryName[]=[]

  //פונקציה שמחזירה את כל הקטגוריות מהשרת
  getCategoriesFromServer():Observable<any>{
    return this._httpClient.get<CategoryName[]>(`http://localhost:8080/api/Category/getCategories`)
  }

}
