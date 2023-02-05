import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable()
export class Httpinterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      });
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if(error.status === 401){
        this.router.navigate(['login']);
        if(sessionStorage.getItem('token')) {
          this.toastService.show('Du har loggats ut, på grund av inaktivitet', {classname: 'bg-danger text-light', delay: 3000});
          sessionStorage.clear();
        }
      }
      return throwError(() => error);
    }));
  }
}
