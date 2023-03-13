import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminMenuComponent } from '@car-mkd-systems/web/shared/layouts/admin-layout/admin-menu/admin-menu.component';

@Component({
  selector: 'car-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminMenuComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnInit {
  public menuMinimized: boolean = localStorage.getItem('user.settings.menu-minimized') === 'true';
  private windowWidth: number;

  public ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    if (!localStorage.getItem('user.settings.menu-minimized') && this.windowWidth < 992) {
      this.menuMinimized = true;
    }
  }

  @HostListener('window:resize')
  private onWindowResize() {
    if (window.innerWidth < 992 && this.windowWidth >= 992 && !this.menuMinimized) {
      this.menuMinimized = true;
      this.saveMenuState();
    } else if (window.innerWidth >= 992 && this.windowWidth < 992 && this.menuMinimized) {
      this.menuMinimized = false;
      this.saveMenuState();
    }
    this.windowWidth = window.innerWidth;
  }

  public saveMenuState() {
    localStorage.setItem('user.settings.menu-minimized', JSON.stringify(this.menuMinimized));
  }
}
