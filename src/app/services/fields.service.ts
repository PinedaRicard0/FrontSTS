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
                debugger;
                console.log(r);
                this.getFields();
            }
        )
    }

    updateField(field : Field){
        let firebaseId = field.firebaseId;
        this.http.put<{ rField: Field }>(
                'https://sts-api-67d7d.firebaseio.com/fields/' + firebaseId + '/.json',
                new Field(field.name, field.address, field.description)
        ).subscribe(
            response => {
               let updatedField = this.fields.filter(f => f.firebaseId == firebaseId)[0];
               updatedField.name = field.name;
               updatedField.address = field.address;
               updatedField.description = field.description;
               this.fieldsEmmiter.next(this.fields);
            }
        )
    }
}