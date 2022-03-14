import { Component, Input } from '@angular/core';
import { CategoryFormDto } from "@car-mkd-systems/shared/dtos/category/category.form.dto";
import { CharacteristicDto } from "@car-mkd-systems/shared/dtos/category/characteristic.dto";
import { CharacteristicFormDto } from '@car-mkd-systems/shared/dtos/category/characteristic.form.dto';
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { validate } from "@car-mkd-systems/web/core/services/validation/validate.service";
import { BaseFormComponent } from "@car-mkd-systems/web/shared/dumbs/base-form/base-form.component";

@Component({
  selector: 'car-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: []
})
export class CategoryFormComponent extends BaseFormComponent<CategoryFormDto> {

  @Input() public category = new CategoryFormDto();
  public dto = CategoryFormDto;

  @Input() public route: string;

  public characteristicEdit: CharacteristicFormDto = new CharacteristicFormDto();

  public constructor(public override readonly errorService: ErrorService) {
    super(errorService);
  }

  public toCharacteristic(characteristic: any): CharacteristicDto {
    return characteristic as CharacteristicDto;
  }

  public rowReorder(event: { dragIndex: number, dropIndex: number }) {
    if (event.dragIndex === event.dropIndex) {
      return;
    }
    this.category.characteristics.forEach((c, index) => c.order = index);
  }

  public addCharacteristic() {
    if (!Array.isArray(this.category.characteristics)) {
      this.category.characteristics = [];
    }
    const characteristic = new CharacteristicFormDto();
    characteristic.order = this.category.characteristics.length;
    this.characteristicEdit = characteristic;
    this.category.characteristics.push(characteristic);
  }

  public updateCharacteristic(characteristic: CharacteristicDto) {
    this.characteristicEdit.order = characteristic.order;
    const { valid, errors } = validate(this.characteristicEdit, CharacteristicFormDto);
    if (!valid) {
      console.error(errors);
      this.errorService.errorValues<CharacteristicFormDto>(errors);
    } else {
      characteristic.name = this.characteristicEdit.name;
      this.characteristicEdit = null;
    }
  }

  public deleteCharacteristic(characteristic: CharacteristicFormDto) {
    this.category.characteristics = this.category.characteristics.filter((c) => characteristic !== c);
  }

}
