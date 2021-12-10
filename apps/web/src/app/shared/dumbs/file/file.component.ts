import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';

@Component({
  selector: 'car-file',
  templateUrl: './file.component.html',
  styleUrls: []
})
export class FileComponent {

  @Input() public file: FileDto;

  @Input() public canDelete = false;
  @Output() public delete = new EventEmitter();


}
