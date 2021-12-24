import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModificationDto } from '@car-mkd-systems/shared/dtos/product/modification.dto';
import { ProductFormDto } from '@car-mkd-systems/shared/dtos/product/product.form.dto';
import { CategoryStateService } from '@car-mkd-systems/web/core/services/category/category-state.service';
import { ConfirmDialogService } from '@car-mkd-systems/web/core/services/confirm-dialog.service';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { FileService } from '@car-mkd-systems/web/core/services/file.service';
import { BaseFormComponent } from '@car-mkd-systems/web/shared/dumbs/base-form/base-form.component';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'car-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent extends BaseFormComponent<ProductFormDto> implements OnInit {

  @Input() public product: ProductFormDto = new ProductFormDto();
  public dto = ProductFormDto;

  public uploadingFiles = false;

  @Input() public categories: CategoryDto[] = [];
  @Input() public modelsCar: ModelCarDto[] = [];

  public category: CategoryDto;

  @ViewChild('fileUpload') public fileUpload: FileUpload;

  @Input() public route = '/';

  public constructor(private readonly fileService: FileService,
                     private readonly categoryStateService: CategoryStateService,
                     private readonly confirmDialogService: ConfirmDialogService,
                     public readonly errorService: ErrorService) {
    super(errorService);
  }

  public ngOnInit() {
    if (this.product?.category) {
      this.selectCategory();
    }
    this.product?.modifications?.forEach((modification) => {
      if (!modification.params) {
        modification.params = {};
      }
    });
  }

  public uploadFiles(data: { files: FileList }) {
    this.uploadingFiles = true;
    this.fileService.upload(data.files).subscribe((files) => {
      if (this.product.images?.length) {
        this.product.images = this.product.images.concat(files);
      } else {
        this.product.images = files;
      }
      this.fileUpload.clear();
      this.uploadingFiles = false;
    }, () => this.uploadingFiles = false);
  }

  public deleteFile(file: FileDto) {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить фотографию?`,
      accept: () => {
        this.uploadingFiles = true;

        this.fileService.deleteFile(file.path).subscribe(() => {
          this.uploadingFiles = false;
          this.product.images = this.product.images.filter((f) => f._id !== file._id);
        });
      }
    });
  }

  public selectCategory() {
    this.categoryStateService.findById<CategoryDto>(this.product.category._id).subscribe((category) => {
      this.category = category;
    });
  }

  public onAddModification() {
    this.product.modifications.push(new ModificationDto());
  }

  public onModificationDelete(modification: ModificationDto) {
    this.product.modifications = this.product.modifications.filter((el) => el !== modification);
  }

  public toImage(image: any): FileDto {
    return image as FileDto;
  }

}
