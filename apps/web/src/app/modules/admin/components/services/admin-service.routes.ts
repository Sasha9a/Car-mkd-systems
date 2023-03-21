import { Routes } from '@angular/router';
import { FontChangeServiceComponent } from '@car-mkd-systems/web/modules/admin/components/services/font-change-service/font-change-service.component';
import { WaterMarksServiceComponent } from '@car-mkd-systems/web/modules/admin/components/services/water-marks-service/water-marks-service.component';

export const adminServiceRoutes: Routes = [
  {
    path: 'font-change',
    component: FontChangeServiceComponent,
    data: {
      title: 'Изменить шрифт'
    }
  },
  {
    path: 'water-marks',
    component: WaterMarksServiceComponent,
    data: {
      title: 'Добавить водяные знаки'
    }
  }
];
