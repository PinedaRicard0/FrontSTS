import { HttpClient } from '@angular/common/http';
import { Field } from '../models/field.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FieldService {

    fields : Field[] = [];
    fieldsEmmiter = new Subject<Field[]>()
    constructor(private http: HttpClient) { }

    getFields() {
        let url = "https://sts-api-67d7d.firebaseio.com/fields.json";
        this.http.get<{ [key: string]: Field }>(url).pipe(
            map(
                response => {
                    const fields: Field[] = [];
                    for (const f in response) {
                        if (response.hasOwnProperty(f)) {
                            fields.push({ ...response[f], firebaseId: f })
                        }
                    }
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
        let url = "https://sts-api-67d7d.firebaseio.com/fields.json";
        this.http.post<{ key: string }>(url, field).subscribe(
            r => {
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