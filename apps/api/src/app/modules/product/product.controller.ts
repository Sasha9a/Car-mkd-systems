import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { ValidateObjectId } from '@car-mkd-systems/api/core/pipes/validate.object.id.pipes';
import { ProductService } from '@car-mkd-systems/api/modules/product/product.service';
import { ProductFormDto } from '@car-mkd-systems/shared/dtos/product/product.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Body, Controller, Delete, HttpStatus, NotFoundException, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  public constructor(private readonly productService: ProductService) {
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  public async createProduct(@Res() res: Response, @Body() body: ProductFormDto) {
    const createdProduct = await this.productService.createProduct(body);
    return res.status(HttpStatus.CREATED).json(createdProduct).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  public async deleteProduct(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const deletedProduct = await this.productService.deleteProduct(id);
    if (!deletedProduct) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }
}
