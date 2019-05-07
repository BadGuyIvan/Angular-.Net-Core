import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('Token');

    if(token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      })
    }

    if(!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json')})
    }

    req = req.clone({
      headers: req.headers.set('Accept', 'application/json')
    })

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      })
    )
  }

  constructor() { }
}
