import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  getCategoryMatches(categoryId: string){
    let url = `${environment.apiUrl}matches/categorymatches/${categoryId}`;
    return this.http.get<Match[]>(url);
  }
}
