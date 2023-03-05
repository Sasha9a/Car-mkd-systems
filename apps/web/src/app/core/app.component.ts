import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutingService } from '@car-mkd-systems/web/core/services/routing.service';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, ToastModule, ConfirmDialogModule, ScrollTopModule],
  selector: 'car-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public constructor(private config: PrimeNGConfig, private readonly routingService: RoutingService) {}

  public ngOnInit() {
    this.config.setTranslation({
      startsWith: 'Начинается с',
      contains: 'Содержит',
      notContains: 'Не содержит',
      endsWith: 'Оканчивается на',
      equals: 'Равно',
      notEquals: 'Не равно',
      noFilter: 'Нет фильтра',
      lt: 'Меньше чем',
      lte: 'Меньше или равно',
      gt: 'Больше чем',
      gte: 'Больше или равно',
      is: 'Равно',
      isNot: 'Не равно',
      before: 'Перед',
      after: 'После',
      dateIs: 'Дата',
      dateIsNot: 'Дата не',
      dateBefore: 'Дата перед',
      dateAfter: 'Дата после',
      apply: 'Применить',
      matchAll: 'Все совпадения',
      matchAny: 'Любое совпадение',
      addRule: 'Добавить правило',
      removeRule: 'Удалить правило',
      accept: 'Да',
      reject: 'Нет',
      choose: 'Выбрать',
      upload: 'Загрузить',
      cancel: 'Отменить',
      weekHeader: 'Неделя',
      weak: 'Слабый',
      medium: 'Средний',
      strong: 'Сильный',
      passwordPrompt: 'Введите пароль',
      emptyMessage: '',
      emptyFilterMessage: '',
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      today: 'Сегодня',
      clear: 'Очистить'
    });

    this.routingService.subscribeRoutes();
  }
}
