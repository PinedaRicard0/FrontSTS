import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    cList : Category[] = [];
    categories = new EventEmitter<Category[]>();
    constructor(private http: HttpClient) { }

    public fetchCategories() {
        this.http
            .get<Category[]>(
                `${environment.apiUrl}teams/categories`
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
        let x = this.cList.filter(c => c.id == parseInt(categoryId));
        return x[0];
    }

}