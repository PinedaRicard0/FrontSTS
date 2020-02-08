import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Field } from '../models/field.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FieldService {

    fields : Field[] = [];
    fieldsEmmiter = new Subject<Field[]>()
    constructor(private http: HttpClient) { }

    getFields() {
        this.http.get< Field[] >(`${environment.apiUrl}fields`).pipe(
            map(
                response => {
                    const fields: Field[] = [];
                    response.forEach(function(field){
                        fields.push(field);
                    })
                    return fields;
                }
            )
        ).subscribe(
            r => {
                this.fields = r;
                this.fieldsEmmiter.next(r);
            }
        );
    }

    createField(field: Field) {
        this.http.post<string>(`${environment.apiUrl}fields`, field).subscribe(
            r => {
                this.getFields();
            }
        )
    }

    updateField(field : Field){
        let id = field.id;
        console.log(`${environment.apiUrl}fields`);
        this.http.put<string>(
                `${environment.apiUrl}fields`,field
        ).subscribe(
            response => {
                debugger;
                if(response === 'updated'){
                    let updatedField = this.fields.filter(f => f.id == id)[0];
                    updatedField.name = field.name;
                    updatedField.address = field.address;
                    updatedField.description = field.description;
                }
                this.fieldsEmmiter.next(this.fields);
            }
        )
    }
}