import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ColorService } from '@car-mkd-systems/web/core/services/color.service';
import { AvatarModule } from 'primeng/avatar';
import uniqolor from 'uniqolor';

@Component({
  selector: 'car-user-avatar',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './user-avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent implements OnInit {
  @Input() public user: { id: number; login: string };
  @Input() public size: 'large' | 'xlarge';
  @Input() public shape: 'circle' | 'square' = 'square';

  public backgroundColor: string;

  public constructor(public readonly colorService: ColorService) {}

  public ngOnInit() {
    this.backgroundColor = uniqolor(`${this.user?.login}-${this.user?.id}`)?.color;
  }
}
