import { Component, OnInit } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { CategoryStateService } from '@car-mkd-systems/web/core/services/category/category-state.service';
import { ModelCarStateService } from '@car-mkd-systems/web/core/services/model-car/model-car-state.service';

@Component({
  selector: 'car-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  public categories: CategoryDto[];
  public modelsCar: ModelCarDto[];

  public constructor(private readonly categoryStateService: CategoryStateService,
                     private readonly modelCarStateService: ModelCarStateService) { }

  public ngOnInit(): void {
    this.categoryStateService.findAllDropdown().subscribe((categories) => {
      this.categories = categories;
    });

    this.modelCarStateService.findAllModel().subscribe((modelsCar) => {
      this.modelsCar = modelsCar;
    });

  }

}
