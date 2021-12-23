import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { ValidateObjectId } from '@car-mkd-systems/api/core/pipes/validate.object.id.pipes';
import { FileService } from '@car-mkd-systems/api/modules/file/file.service';
import { ProductService } from '@car-mkd-systems/api/modules/product/product.service';
import { UserService } from '@car-mkd-systems/api/modules/user/user.service';
import { ProductFormDto } from '@car-mkd-systems/shared/dtos/product/product.form.dto';
import { ProductItemDto } from '@car-mkd-systems/shared/dtos/product/product.item.dto';
import { ProductQueryDto } from '@car-mkd-systems/shared/dtos/product/product.query.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Controller('product')
export class ProductController {
  public constructor(private readonly productService: ProductService,
                     private readonly userService: UserService,
                     private readonly fileService: FileService) {
  }

  @Get()
  public async findAll(@Res() res: Response, @Req() req: Request, @Query() query: ProductQueryDto) {
    const user = req.headers.authorization ? await this.userService.findByToken(req.headers.authorization.replace("Bearer ", "")) : null;
    const products = await this.productService.findAll(query, user);
    if (!user) {
      products.forEach((product) => {
        product.modifications.forEach((modification) => {
          delete modification.pricePartner;
          delete modification.discountPartner;
        });
      });
    }
    const count = await this.productService.countFindAll(query, user);
    return res.status(HttpStatus.OK).json(<ProductItemDto>{
      items: products as any[],
      count: count
    }).end();
  }

  @Get(':id')
  public async findById(@Res() res: Response, @Req() req: Request, @Param('id', new ValidateObjectId()) id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).send("Товар не существует").end();
    }
    const user = req.headers.authorization ? await this.userService.findByToken(req.headers.authorization.replace("Bearer ", "")) : null;
    if ((!user || !user.roles?.includes(RoleEnum.ADMIN)) && !product.isPublic) {
      return res.status(HttpStatus.NOT_FOUND).send("Ошибка доступа").end();
    }
    if (!user) {
      product.modifications.forEach((modification) => {
        delete modification.pricePartner;
        delete modification.discountPartner;
      });
    }
    return res.status(HttpStatus.OK).json(product).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  public async createProduct(@Res() res: Response, @Body() body: ProductFormDto) {
    const createdProduct = await this.productService.createProduct(body);
    if (!createdProduct) {
      throw new NotFoundException("Произошла ошибка!");
    }
    return res.status(HttpStatus.CREATED).json(createdProduct).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  public async updateProduct(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: ProductFormDto) {
    const updatedProduct = await this.productService.updateProduct(id, body);
    if (!updatedProduct) {
      throw new NotFoundException("Нет такого товара!");
    }
    return res.status(HttpStatus.OK).json(updatedProduct).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  public async deleteProduct(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const deletedProduct = await this.productService.deleteProduct(id);
    if (!deletedProduct) {
      throw new NotFoundException("Нет такого объекта!");
    }
    for (const image of deletedProduct.images) {
      await this.fileService.deleteFile(image.path);
      fs.unlinkSync('./public/' + image.path);
    }
    return res.status(HttpStatus.OK).end();
  }
}
