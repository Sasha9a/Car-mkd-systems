import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { BrandCarDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.dto";
import { ModelCarDto } from "@car-mkd-systems/shared/dtos/modelCar/model.car.dto";

@Component({
  selector: 'car-model-car-multi-select',
  templateUrl: './model-car-multi-select.component.html',
  styleUrls: []
})
export class ModelCarMultiSelectComponent {

  @Input() public brandCars: BrandCarDto[] = [];

  @Input() public selectedModelCars: ModelCarDto[] = [];
  @Output() public selectedModelCarsChange = new EventEmitter<ModelCarDto[]>();

  @Input() public class = '';
  @Input() public disabled = false;
  @Input() public placeholder = '';

  public dataBrandCars: { label: string, key: string, children: any[] }[];
  public dataSelectBrandCars: { label: string, key: string, children: any[] }[];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['brandCars']?.currentValue) {
      this.dataBrandCars = this.parseBrandCars(changes['brandCars'].currentValue);
    }
    if (changes['selectedModelCars']?.currentValue) {
      this.dataSelectBrandCars = [];
      this.dataBrandCars.forEach((brandCar) => {
        this.dataSelectBrandCars.push(...brandCar.children?.filter((modelCar) => {
          return changes['selectedModelCars'].currentValue.some((c) => c._id === modelCar.key);
        }));
      });
    }
  }

  public changeValue(items: { label: string, key: string, children: any[] }[]) {
    const selectModelCars = [];
    this.brandCars.forEach((brandCar) => {
      selectModelCars.push(...brandCar.models?.filter((modelCar) => {
        return items.some((c) => c.key === modelCar._id);
      }));
    });
    this.selectedModelCarsChange.emit(selectModelCars);
  }

  public parseBrandCars(brandCars: BrandCarDto[]): { label: string, key: string, children: any[] }[] {
    if (!brandCars || !brandCars.length) {
      return [];
    }
    return brandCars.map((brandCar) => {
      return {
        label: brandCar.name,
        key: brandCar._id,
        selectable: false,
        children: brandCar.models.map((modelCar) => {
          return {
            label: modelCar.name,
            key: modelCar._id
          };
        })
      };
    });
  }

}
