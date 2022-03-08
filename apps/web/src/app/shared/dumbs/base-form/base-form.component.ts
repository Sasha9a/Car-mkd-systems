import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { validate } from '@car-mkd-systems/web/core/services/validation/validate.service';

@Component({
  selector: 'car-base-form',
  template: '',
  styleUrls: []
})
export abstract class BaseFormComponent<T> {

  @Input() public saveButtonLabel = 'Сохранить';
  @Input() public canDelete = false;
  @Output() public save = new EventEmitter<T>();
  @Output() public delete = new EventEmitter<T>();
  public errors: Record<keyof T, any[]>;

  public abstract dto: new () => T;

  protected constructor(public readonly errorService: ErrorService) {
  }

  public onSave(entity: T) {
    const { valid, errors } = validate(entity, this.dto);
    if (!valid) {
      this.errors = errors;
      console.log(entity);
      this.errorService.errorValues<T>(this.errors);
      console.log(this.errors);
    } else {
      this.errors = null;
      this.save.emit(entity);
    }
  }

}