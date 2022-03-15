import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { BrandCarDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.dto";

@Component({
  selector: 'car-brand-car-multi-select',
  templateUrl: './brand-car-multi-select.component.html',
  styleUrls: []
})
export class BrandCarMultiSelectComponent {

  @Input() public brandCars: BrandCarDto[] = [];

  @Input() public selectedBrandCars: BrandCarDto[] = [];
  @Output() public selectedBrandCarsChange = new EventEmitter<BrandCarDto[]>();

  @Input() public class = '';
  @Input() public disabled = false;
  @Input() public placeholder = '';

  public dataBrandCars: { label: string, key: string, children: any[] }[];
  public dataSelectBrandCars: { label: string, key: string, children: any[] }[];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['brandCars']?.currentValue) {
      this.dataBrandCars = this.parseBrandCars(changes['brandCars'].currentValue);
    }
    if (changes['selectedBrandCars']?.currentValue) {
      this.dataSelectBrandCars = this.dataBrandCars.filter((brandCar) => {
        return changes['selectedBrandCars'].currentValue.some((c) => c._id === brandCar.key);
      });
    }
  }

  public changeValue(items: { label: string, key: string, children: any[] }[]) {
    const selectBrandCars = this.brandCars.filter((brandCar) => {
      return items.some((c) => c.key === brandCar._id);
    });
    this.selectedBrandCarsChange.emit(selectBrandCars);
  }

  public parseBrandCars(brandCars: BrandCarDto[]): { label: string, key: string, children: any[] }[] {
    if (!brandCars || !brandCars.length) {
      return [];
    }
    return brandCars.map((brandCar) => {
      return {
        label: brandCar.name,
        key: brandCar._id,
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
