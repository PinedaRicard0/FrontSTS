import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    cList : Category[] = [];
    categories = new EventEmitter<Category[]>();

    constructor(private http: HttpClient) { }

    public fetchCategories() {
        this.http
            .get<{ [key: string]: Category }>(
                'https://sts-api-67d7d.firebaseio.com/categories.json'
            )
            .pipe(
                map(responseData => {
                    const categoriesArray: Category[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            categoriesArray.push({ ...responseData[key], firebaseId: key });
                        }
                    }
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