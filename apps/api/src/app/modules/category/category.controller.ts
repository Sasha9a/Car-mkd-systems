import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { ValidateObjectId } from '@car-mkd-systems/api/core/pipes/validate.object.id.pipes';
import { CategoryService } from '@car-mkd-systems/api/modules/category/category.service';
import { CategoryFormDto } from '@car-mkd-systems/shared/dtos/category/category.form.dto';
import { CharacteristicFormDto } from '@car-mkd-systems/shared/dtos/category/characteristic.form.dto';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {
  }

  @Get()
  public async getAll(@Res() res: Response) {
    const category = await this.categoryService.findAll();
    return res.status(HttpStatus.OK).json(category).end();
  }

  @Post('/characteristic')
  public async createCharacteristic(@Res() res: Response, @Body() body: CharacteristicFormDto) {
    const characteristic = await this.categoryService.checkCategory(body.category._id);
    if (!characteristic) {
      return res.status(HttpStatus.NOT_FOUND).json({ category: "Категория не существует" }).end();
    }
    const createdCharacteristic = await this.categoryService.createCharacteristic(body);
    await this.categoryService.addCharacteristicToCategory(createdCharacteristic);
    return res.status(HttpStatus.CREATED).json(createdCharacteristic).end();
  }

  @Post()
  public async createCategory(@Res() res: Response, @Body() body: CategoryFormDto) {
    const createdCategory = await this.categoryService.createCategory(body);
    return res.status(HttpStatus.CREATED).json(createdCategory).end();
  }

  @Put('/:id')
  public async updateCategory(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: CategoryFormDto) {
    const updatedCategory = await this.categoryService.updateCategory(id, body);
    if (!updatedCategory) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(updatedCategory).end();
  }

  @Put('/characteristic/:id')
  public async updateCharacteristic(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: CharacteristicFormDto) {
    const updatedCharacteristic = await this.categoryService.updateCharacteristic(id, body);
    if (!updatedCharacteristic) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(updatedCharacteristic).end();
  }

  @Delete('/:id')
  public async deleteCategory(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const deletedCategory = await this.categoryService.deleteCategory(id);
    if (!deletedCategory) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }

  @Delete('/characteristic/:id')
  public async deleteCharacteristic(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const deletedCharacteristic = await this.categoryService.deleteCharacteristic(id);
    if (!deletedCharacteristic) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }
}