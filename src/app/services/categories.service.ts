import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { Pool } from '../models/pool.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    cList : Category[] = [];
    categories = new EventEmitter<Category[]>();
    categoryPools = new EventEmitter<Pool[]>();
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

    public getPoolsByCategory(id: number){
        this.http.get<Pool[]>(`${environment.apiUrl}categories/categoriepools/${id}`).
        pipe(
            map(
                res => {
                    const poolArray:Pool[] = [];
                    res.forEach(function(pool){
                        poolArray.push(pool);
                    })
                    return poolArray;
                }
            )
        ).subscribe(
            pools => {
                this.categoryPools.emit(pools);
            }
        )
    }

    public canStartCategory(category: string) {
        return this.http.get<boolean>(`${environment.apiUrl}categories/canstart/${category}`);
    }

    public InitiateCategorie(categoryId: string){
        return this.http.post(`${environment.apiUrl}categories/start`, categoryId);
    }

    public updateStartedCategory(categoryId: string){
        debugger;
        var cat = this.cList.filter(c =>  c.id == Number(categoryId))[0];
        cat.status = 'started'
        this.categories.emit(this.cList);
    }
}