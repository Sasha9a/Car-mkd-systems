import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'car-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  public constructor(private readonly router: Router) {}

  public ngOnInit() {
    this.router.navigate(['/admin']).catch(console.error);
  }
}
