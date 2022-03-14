import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  public constructor(private readonly authService: AuthService,
                     private readonly errorService: ErrorService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err) => {
      if (err.status === 401) {
        this.authService.logout();
      }

      const error = err.error.errors || err.error || { message: err.statusText };

      if (err.status === 0 && !navigator.onLine) {
        error.message = 'Не удалось установить связь с сервером. Проверьте Ваше интернет соединение.';
      }
      this.errorService.addDefaultError(error);

      return throwError(error);
    }));
  }

}
