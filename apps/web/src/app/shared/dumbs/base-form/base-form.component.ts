import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  public onSave(entity: T) {
    const { valid, errors } = validate(entity, this.dto);
    if (!valid) {
      this.errors = errors;
      console.log(entity);
      console.log(this.errors);
    } else {
      this.errors = null;
      this.save.emit(entity);
    }
  }

}
