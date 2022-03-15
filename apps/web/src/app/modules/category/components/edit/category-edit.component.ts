import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryDto } from "@car-mkd-systems/shared/dtos/category/category.dto";
import { CategoryFormDto } from "@car-mkd-systems/shared/dtos/category/category.form.dto";
import { CategoryStateService } from "@car-mkd-systems/web/core/services/category/category-state.service";
import { ConfirmDialogService } from "@car-mkd-systems/web/core/services/confirm-dialog.service";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";

@Component({
  selector: 'car-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: []
})
export class CategoryEditComponent implements OnInit {

  public categoryId: string;

  public category: CategoryDto;
  public saving = false;

  public constructor(private readonly categoryStateService: CategoryStateService,
                     private readonly errorService: ErrorService,
                     private readonly confirmDialogService: ConfirmDialogService,
                     private readonly router: Router,
                     private readonly route: ActivatedRoute,
                     private readonly title: Title) { }

  public ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];

    if (!this.categoryId) {
      return this.errorService.addCustomError('Ошибка', 'Произошла ошибка, вернитесь на главную и попробуйте снова.');
    }

    this.categoryStateService.findById<CategoryDto>(this.categoryId).subscribe((category) => {
      this.category = category;
      this.title.setTitle(`${this.category.name} - CMS`);
    });
  }

  public edit(body: CategoryFormDto) {
    this.saving = true;

    this.categoryStateService.update<CategoryFormDto>(this.categoryId, body).subscribe(() => {
      this.saving = false;
      this.errorService.addSuccessMessage("Категория изменена");
      this.router.navigate(['/category']).catch(console.error);
    }, () => this.saving = false);
  }

  public delete() {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить категорию "${this.category.name}"?<br /><br />ВНИМАНИЕ! У товаров удалится категория`,
      accept: () => {
        this.saving = true;

        this.categoryStateService.deleteById(this.category._id).subscribe(() => {
          this.saving = false;
          this.errorService.addSuccessMessage(`Успешно`, `Категория "${this.category.name}" удалена`);
          this.router.navigate(['/category']).catch(console.error);
        });
      }
    });
  }

}
