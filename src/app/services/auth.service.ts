import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService{

    constructor(private http : HttpClient){}

    singup(email: string, pass: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPR6B167c7QHtjnMbpaQdwDCMbbwclp3M',
            {
                email: email,
                password: pass,
                returnSecureToken: true
            }
        );
    }
}