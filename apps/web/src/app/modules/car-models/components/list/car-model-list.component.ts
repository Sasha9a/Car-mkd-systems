import { Component, OnInit } from '@angular/core';
import { BrandCarDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.dto";
import { ModelCarStateService } from "@car-mkd-systems/web/core/services/model-car/model-car-state.service";

@Component({
  selector: 'car-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: []
})
export class CarModelListComponent implements OnInit {

  public brandCars: BrandCarDto[];
  public loading = false;

  public constructor(private readonly modelCarStateService: ModelCarStateService) { }

  public ngOnInit(): void {
    this.loadCategories();
  }

  public loadCategories() {
    this.loading = true;

    this.modelCarStateService.find<BrandCarDto>().subscribe((data) => {
      this.brandCars = data;
      this.loading = false;
    }, () => this.loading = false);
  }

  public toBrandCar(brandCar: any): BrandCarDto {
    return brandCar as BrandCarDto;
  }

}
