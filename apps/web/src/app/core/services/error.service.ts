import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public constructor(private readonly messageService: MessageService) { }

  public addCustomError(title = 'Ошибка', description = '', life = 10000) {
    this.messageService.add({ severity: 'error', summary: title, detail: description, life });
  }

  public addDefaultError(error: any, title = 'Ошибка') {
    if (error.error?.statusCode === 403) {
      return this.messageService.add({ severity: 'error', summary: title, detail: 'Отказано в доступе', life: 10000 });
    }

    const description = error.error?.message || error.message || error.detail || '';

    if (typeof description === 'string') {
      return this.messageService.add({ severity: 'error', summary: title, detail: description, life: 10000 });
    } else if (Array.isArray(description)) {
      description.forEach((item) => {
        if (typeof item === 'string') {
          return this.messageService.add({ severity: 'error', summary: title, detail: item, life: 10000 });
        }
      });
    }
  }


  public errorValues<T>(form: Record<keyof T, any[]>, life = 10000) {
    const error = Object.values(form).map((er: any[]) => er?.map((er1) => `${er1}`).join(', ')).join(', ');
    this.messageService.add({ severity: 'error', summary: 'Заполните все поля', detail: error, life });
  }

  public addSuccessMessage(title: string = 'ОК', description: string = '', life = 10000) {
    this.messageService.add({ severity: 'success', summary: title, detail: description, life });
  }

}
