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

    if (typeof error.error.errors === 'object' && error.error.errors !== null && !Array.isArray(error.error.errors)) {
      const errors = error.error.errors as Record<string, string | string[]>;
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
      detail = error.message;
    }

    this.messageService.add({ key: 'message', severity: 'error', summary: 'Ошибка', detail: detail, life: 10000 });
  }

  public addSuccessMessage(title: string = 'ОК', description: string = '', life = 10000) {
    this.messageService.add({ key: 'message', severity: 'success', summary: title, detail: description, life });
  }
}
