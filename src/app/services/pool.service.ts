import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoolService {

  constructor(private http: HttpClient) { }

  getCategoryPoolsAndTeamsStatistics(categoryId: string){
    let url =`${environment.apiUrl}pools/categorypoolsstatistics/${categoryId}`;
    return this.http.get(url);
  }
}
