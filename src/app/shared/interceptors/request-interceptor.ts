import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  intercept(req:HttpRequest<any>, next:HttpHandler) : Observable<HttpEvent<any>> {
    const user = localStorage.getItem('user');
    console.log('\n### RequestInterceptor user', user)

    if(user) {
        // const authReq = req.clone({setHeaders:{user:user}});

        const authReq = req.clone({setHeaders:{"Authorization":"Bearer " + user}});

        console.log('authReq', authReq)
        return next.handle(authReq)
    }
    return next.handle(req);
}
}
