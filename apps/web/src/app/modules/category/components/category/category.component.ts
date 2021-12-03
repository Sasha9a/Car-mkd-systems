import { Component, OnInit } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { CategoryFormDto } from '@car-mkd-systems/shared/dtos/category/category.form.dto';
import { CharacteristicDto } from '@car-mkd-systems/shared/dtos/category/characteristic.dto';
import { CharacteristicFormDto } from '@car-mkd-systems/shared/dtos/category/characteristic.form.dto';
import { CategoryStateService } from '@car-mkd-systems/web/core/services/category/category-state.service';
import { ConfirmDialogService } from '@car-mkd-systems/web/core/services/confirm-dialog.service';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { validate } from '@car-mkd-systems/web/core/services/validation/validate.service';

@Component({
  selector: 'car-category',
  templateUrl: './category.component.html',
  styleUrls: []
})
export class CategoryComponent implements OnInit {

  public categories: CategoryDto[];

  public category: CategoryFormDto = new CategoryFormDto();
  public errorsCategory: Record<keyof CategoryFormDto, any[]>;

  public characteristic: CharacteristicFormDto[];
  public errorsCharacteristic: Record<keyof CharacteristicFormDto, any[]>[];

  public loading = true;
  public saving = false;
  public categoryEdit: CategoryFormDto = new CategoryFormDto();
  public characteristicEdit: CharacteristicFormDto = new CharacteristicFormDto();
  public editableId: string;

  public folding = true;

  public constructor(private readonly categoryStateService: CategoryStateService,
                     private readonly confirmDialogService: ConfirmDialogService,
                     private readonly errorService: ErrorService) { }

  public ngOnInit(): void {
    this.categoryStateService.find<CategoryDto>().subscribe((categories) => {
      this.categories = categories;
      this.characteristic = this.categories.map(() => new CharacteristicFormDto());
      this.errorsCharacteristic = this.categories.map(() => null);
      this.loading = false;
    });

    this.folding = localStorage.getItem('cms.category.folding') ? JSON.parse(localStorage.getItem('cms.category.folding')) : true;
  }

  public createCategory() {
    this.saving = true;

    const { valid, errors } = validate(this.category, CategoryFormDto);
    if (!valid) {
      console.error(errors);
      this.errorsCategory = errors;
      this.saving = false;
      this.errorService.errorValues<CategoryFormDto>(this.errorsCategory);
    } else {
      this.errorsCategory = null;

      this.categoryStateService.create<CategoryFormDto, CategoryDto>(this.category).subscribe((result) => {
        this.saving = false;
        this.category.name = undefined;
        this.errorService.addSuccessMessage(`Категория ${result.name} создана`);
        this.categories.push(result);
        this.characteristic.push(new CharacteristicFormDto());
        this.errorsCharacteristic.push(null);
      }, () => this.saving = false);
    }
  }

  public createCharacteristic(category: CategoryDto, index: number) {
    this.saving = true;

    this.characteristic[index].category = category;
    this.characteristic[index].order = category.characteristics.length;
    const { valid, errors } = validate(this.characteristic[index], CharacteristicFormDto);
    if (!valid) {
      console.error(errors);
      this.errorsCharacteristic[index] = errors;
      this.saving = false;
      this.errorService.errorValues<CharacteristicFormDto>(this.errorsCharacteristic[index]);
    } else {
      this.errorsCharacteristic[index] = null;

      this.categoryStateService.createCharacteristic(this.characteristic[index]).subscribe((result) => {
        this.saving = false;
        this.characteristic[index] = undefined;
        category.characteristics.push(result);
        this.errorService.addSuccessMessage(`Характеристика ${result.name} создана`);
      }, () => this.saving = false);
    }
  }

  public updateCategory(category: CategoryDto, formCategory: CategoryFormDto) {
    this.saving = true;

    const { valid, errors } = validate(formCategory, CategoryFormDto);
    if (!valid) {
      console.error(errors);
      this.saving = false;
      this.errorService.errorValues<CategoryFormDto>(errors);
    } else {
      this.categoryStateService.update<CategoryFormDto>(category._id, formCategory).subscribe((result) => {
        this.saving = false;
        this.errorService.addSuccessMessage(`Категория ${category.name} изменена на ${result.name}`);
        category.name = formCategory.name;
        this.editableId = null;
      }, () => this.saving = false);
    }
  }

  public updateCharacteristic(characteristic: CharacteristicDto, formCharacteristic: CharacteristicFormDto) {
    this.saving = true;

    const { valid, errors } = validate(formCharacteristic, CharacteristicFormDto);
    if (!valid) {
      console.error(errors);
      this.saving = false;
      this.errorService.errorValues<CharacteristicFormDto>(errors);
    } else {
      this.categoryStateService.updateCharacteristic(characteristic._id, formCharacteristic).subscribe((result) => {
        this.saving = false;
        this.errorService.addSuccessMessage(`Модель ${characteristic.name} изменена на ${result.name}`);
        characteristic.name = formCharacteristic.name;
        this.editableId = null;
      }, () => this.saving = false);
    }
  }

  public deleteCategory(category: CategoryDto) {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить категорию "${category.name}"?`,
      accept: () => {
        this.saving = true;

        this.categoryStateService.deleteById(category._id).subscribe(() => {
          this.saving = false;
          this.errorService.addSuccessMessage(`Категория ${category.name} удалена`);
          this.categories = this.categories.filter((c) => category._id !== c._id);
        });
      }
    });
  }

  public deleteCharacteristic(characteristic: CharacteristicDto, category: CategoryDto) {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить характеристику "${characteristic.name}" категории "${category.name}"?`,
      accept: () => {
        this.saving = true;

        this.categoryStateService.deleteCharacteristic(characteristic._id).subscribe(() => {
          this.saving = false;
          this.errorService.addSuccessMessage(`Характеристика ${characteristic.name} удалена`);
          category.characteristics = category.characteristics.filter((c) => characteristic._id !== c._id);
        });
      }
    });
  }

  public toCharacteristic(characteristic: any): CharacteristicDto {
    return characteristic as CharacteristicDto;
  }

  public rowReorder(category: CategoryDto) {
    category.characteristics.forEach((c, index) => c.order = index);
  }

  public setFolding() {
    localStorage.setItem('cms.category.folding', String(this.folding));
  }

}
