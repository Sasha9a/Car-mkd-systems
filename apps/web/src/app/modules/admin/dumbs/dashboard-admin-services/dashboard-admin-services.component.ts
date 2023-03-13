import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'car-dashboard-admin-services',
  standalone: true,
  imports: [CommonModule, CardModule, RouterModule],
  templateUrl: './dashboard-admin-services.component.html',
  styleUrls: ['./dashboard-admin-services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DashboardAdminServicesComponent {
  public services: Array<{ name: string; link: string; description: string }> = [
    { name: 'Изменить шрифт', link: '/admin/service/font-change', description: 'Сервис изменяет шрифт текста для Авито' },
    { name: 'Добавить водяные знаки', link: '/admin/service/water-marks', description: 'Сервис добавляет водные знаки на изображения' }
  ];
}
