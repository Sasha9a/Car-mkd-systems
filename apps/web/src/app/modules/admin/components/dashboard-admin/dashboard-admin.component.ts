import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardAdminServicesComponent } from '@car-mkd-systems/web/modules/admin/dumbs/dashboard-admin-services/dashboard-admin-services.component';

@Component({
  selector: 'car-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardAdminServicesComponent],
  templateUrl: './dashboard-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardAdminComponent {}
