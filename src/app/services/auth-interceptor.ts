import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
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
                debugger;
                if(user && user.token && (!req.url.includes('Auth/register') || !req.url.includes('Auth/login'))){
                    const request = req.clone({
                        headers : new HttpHeaders().set('Authorization', 'Bearer ' + user.token)
                    });
                    return next.handle(request);
                }
                return next.handle(req);
            })
        );        
    }

}