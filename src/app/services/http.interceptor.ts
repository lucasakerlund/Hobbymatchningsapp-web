import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Httpinterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      });
    }

    console.log(request.headers);

    return next.handle(request);
  }
}
