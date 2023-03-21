import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { ApiUrlPipe } from '@car-mkd-systems/web/shared/pipes/api-url.pipe';
import { FileTypePipe } from '@car-mkd-systems/web/shared/pipes/file-type.pipe';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'car-file',
  standalone: true,
  imports: [CommonModule, ApiUrlPipe, ImageModule, FileTypePipe],
  templateUrl: './file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent {
  @Input() public file: FileDto;

  @Input() public canDelete = false;
  @Output() public delete = new EventEmitter();
}
