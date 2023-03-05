import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public constructor(private readonly authService: AuthService, private readonly errorService: ErrorService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.logout();
        }

        if (err.status === 0 && !navigator.onLine) {
          this.errorService.addCustomError(
            'Ошибка соединения',
            'Не удалось установить связь с сервером. Проверьте Ваше интернет соединение'
          );
        } else {
          this.errorService.addDefaultError(err);
        }

        return throwError(err);
      })
    );
  }
}
