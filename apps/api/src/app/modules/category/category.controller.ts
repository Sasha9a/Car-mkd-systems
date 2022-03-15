import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { ValidateObjectId } from '@car-mkd-systems/api/core/pipes/validate.object.id.pipes';
import { CategoryService } from '@car-mkd-systems/api/modules/category/category.service';
import { ProductService } from '@car-mkd-systems/api/modules/product/product.service';
import { CategoryFormDto } from '@car-mkd-systems/shared/dtos/category/category.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@Controller('category')
export class CategoryController {

  public constructor(private readonly categoryService: CategoryService,
                     private readonly productService: ProductService) {
  }

  @Get()
  public async getAll(@Res() res: Response) {
    let entities = await this.categoryService.findAll();
    entities = entities.filter((entity) => !entity.parentId);
    return res.status(HttpStatus.OK).json(entities).end();
  }

  @Get('/:id')
  public async getById(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const entity = await this.categoryService.findById(id);
    if (!entity) {
      return res.status(HttpStatus.NOT_FOUND).send("Категория не существует").end();
    }
    return res.status(HttpStatus.OK).json(entity).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  public async createCategory(@Res() res: Response, @Body() body: CategoryFormDto) {
    const entity = await this.categoryService.create(body);
    if (body.parentId) {
      const parent = await this.categoryService.findById(body.parentId);
      parent.children.push(entity);
      await parent.save();
    }
    return res.status(HttpStatus.CREATED).json(entity).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/:id')
  public async updateCategory(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: CategoryFormDto) {
    const entity = await this.categoryService.update(id, body);
    if (!entity) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(entity).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/:id')
  public async deleteCategory(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const entity = await this.categoryService.delete(id);
    if (!entity) {
      throw new NotFoundException("Нет такого объекта!");
    }
    if (entity.parentId) {
      const parent = await this.categoryService.findById(entity.parentId);
      await this.categoryService.update(parent._id, { children: parent.children });
    }
    const isParent = !!entity.parentId;
    if (isParent) {
      const parent = await this.categoryService.findById(entity.parentId);
      await this.categoryService.update(parent._id, { children: parent.children });
    }
    const products = await this.productService.findAll({ category: entity._id });
    for (const product of products) {
      await this.productService.update(product._id, { category: isParent ? entity.parentId : null });
      if (!isParent) {
        await this.productService.update(product._id, { isPublic: false });
      }
    }
    return res.status(HttpStatus.OK).end();
  }

}
