import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {throwError, BehaviorSubject} from 'rxjs'; 
import { User } from '../models/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{

    user = new BehaviorSubject <User>(null);
    private logoutTimer : any;

    constructor(private http : HttpClient, private router : Router){}

    singUp(email: string, pass: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPR6B167c7QHtjnMbpaQdwDCMbbwclp3M',
            {
                email: email,
                password: pass,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    login(email : string, password : string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPR6B167c7QHtjnMbpaQdwDCMbbwclp3M', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe( catchError(this.handleError) , tap(resData => {
            this.handleAuth (resData.email, resData.localId, resData.idToken, Number(resData.expiresIn));
        }));
    }

    autoLogin() {
        const userData: {
            email: string,
            password: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        else {
            const loadedUser = new User(
                userData.email,
                userData.password,
                userData._token,
                new Date(userData._tokenExpirationDate)
                );
            
            if(loadedUser.token == null){
                this.logout();
            }
            else{
                this.user.next(loadedUser);
                let expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
                this.autoLogout(expirationDuration);
            }
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if(this.logoutTimer){
            clearTimeout(this.logoutTimer);
        }
        this.logoutTimer = null;
    }

    
    autoLogout(expirationDuration: number){
        this.logoutTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuth(email: string, userId: string ,token : string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const tmpUser = new User(
            email,
            userId,
            token,
            expirationDate
            );
        this.user.next(tmpUser);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(tmpUser));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknow error ocurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This user is not registered';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect password';
                break;
            case 'EMAIL_EXISTS':
                errorMessage = 'This user is already logged';
                break;
        }
        return throwError(errorMessage);
    }
}