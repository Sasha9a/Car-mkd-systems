import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public constructor(private messageService: MessageService) {}

  public addCustomError(title = 'Ошибка', description = '', life = 10000) {
    this.messageService.add({ key: 'message', severity: 'error', summary: title, detail: description, life });
  }

  public addDefaultError(error: HttpErrorResponse) {
    if (error.status === 412) {
      const message: string = error.error?.errors?.message || error.error?.message || error.statusText;
      return this.messageService.add({
        key: 'message',
        severity: 'error',
        summary: 'Ошибка',
        detail: message,
        life: 10000
      });
    }

    let detail: string;

    if (typeof error.error.message === 'object' && error.error.message !== null && !Array.isArray(error.error.message)) {
      const errors = error.error.message as Record<string, string | string[]>;
      detail = Object.entries(errors)
        .map(([key, errorData]) => {
          if (typeof errorData === 'string') {
            return `[${key}]: ${errorData}`;
          } else if (Array.isArray(errorData)) {
            return `[${key}]: ${errorData.join(', ')}`;
          }
          return `[${key}]: ${errorData}`;
        })
        .join('\n');
    } else {
      detail = error.error.message || error.message;
    }

    this.messageService.add({ key: 'message', severity: 'error', summary: 'Ошибка', detail: detail, life: 10000 });
  }

  public errorValues<T>(form: Record<keyof T, any[]>, life = 10000) {
    const error = Object.values(form)
      .map((er: any[]) => {
        return er
          ?.map((er1) => {
            if (typeof er1 === 'object') {
              return Object.values(er1)
                .map((e: any[]) => e?.map((e1) => `${e1}`))
                .join(', ');
            } else {
              return `${er1}`;
            }
          })
          .join(', ');
      })
      .join(', ');
    this.messageService.add({ severity: 'error', summary: 'Заполните все поля', detail: error, life });
  }

  public addSuccessMessage(title: string = 'ОК', description: string = '', life = 10000) {
    this.messageService.add({ key: 'message', severity: 'success', summary: title, detail: description, life });
  }
}
