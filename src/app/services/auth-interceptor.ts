import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private as : AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.as.user.pipe(
            take(1),
            exhaustMap( user => {
                if(user && user.token){
                    const request = req.clone({
                        params: new HttpParams().set('auth', user.token)
                    });
                    return next.handle(request);
                }
                return next.handle(req);
            })
        );        
    }

}