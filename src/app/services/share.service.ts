import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http: HttpClient) { }

  getBreadScrumbData(id: string, viewName: string){
      let params = new HttpParams()
        .set("id",id)
        .set("view", viewName);
      return this.http.get(`${environment.apiUrl}players/breadcrumb`,{params: params});
  }
}
