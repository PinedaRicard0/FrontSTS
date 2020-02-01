import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    cList : Category[] = [];
    categories = new EventEmitter<Category[]>();
    // firebase url = https://sts-api-67d7d.firebaseio.com/categories.json
    // [key: string]: Category
    constructor(private http: HttpClient) { }

    public fetchCategories() {
        this.http
            .get<Category[]>(
                'http://localhost:50059/api/teams/categories'
            )
            .pipe(
                map(responseData => {
                    const categoriesArray: Category[] = [];
                    responseData.forEach(function(categorie){
                        categoriesArray.push(categorie);
                    })
                    return categoriesArray;
                })
            ).subscribe(categories => {
                this.cList = categories;
                this.categories.emit(categories);
            });
    }

    getCategoryById(categoryId :string){
        debugger;
        let x = this.cList.filter(c => c.id == parseInt(categoryId));
        return x[0];
    }

}