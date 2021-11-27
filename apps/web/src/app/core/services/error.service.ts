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

  public addSuccessMessage(title: string = 'ОК', description: string = '', life = 10000) {
    this.messageService.add({ severity: 'success', summary: title, detail: description, life });
  }

}
