import { Component, Input, ViewChild } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ProductFormDto } from '@car-mkd-systems/shared/dtos/product/product.form.dto';
import { ConfirmDialogService } from '@car-mkd-systems/web/core/services/confirm-dialog.service';
import { FileService } from '@car-mkd-systems/web/core/services/file.service';
import { BaseFormComponent } from '@car-mkd-systems/web/shared/dumbs/base-form/base-form.component';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'car-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends BaseFormComponent<ProductFormDto> {

  @Input() public product: ProductFormDto = new ProductFormDto();
  public dto = ProductFormDto;

  public uploadingFiles = false;

  @Input() public categories: CategoryDto[] = [];
  @Input() public modelsCar: ModelCarDto[] = [];

  @ViewChild('fileUpload') public fileUpload: FileUpload;

  public constructor(private readonly fileService: FileService,
                     private readonly confirmDialogService: ConfirmDialogService) {
    super();
  }

  public uploadFiles(data: { files: FileList }) {
    this.uploadingFiles = true;
    this.fileService.upload(data.files).subscribe((files) => {
      this.product.images = Array.isArray(files) ? files.map((file) => file?.path) : files;
      this.fileUpload.clear();
      this.uploadingFiles = false;
    }, () => this.uploadingFiles = false);
  }

}
