import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { ValidateObjectId } from '@car-mkd-systems/api/core/pipes/validate.object.id.pipes';
import { ModelCarService } from '@car-mkd-systems/api/modules/model-car/model.car.service';
import { BrandCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@Controller('car-model')
export class ModelCarController {

  public constructor(private readonly modelCarService: ModelCarService) {
  }

  @Get()
  public async getAll(@Res() res: Response) {
    const entities = await this.modelCarService.findAll();
    return res.status(HttpStatus.OK).json(entities).end();
  }

  @Get(':id')
  public async getById(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const entity = await this.modelCarService.findById(id);
    return res.status(HttpStatus.OK).json(entity).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  public async create(@Res() res: Response, @Body() body: BrandCarFormDto) {
    const entity = await this.modelCarService.create(body);
    return res.status(HttpStatus.CREATED).json(entity).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  public async update(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: BrandCarFormDto) {
    const entity = await this.modelCarService.update(id, body);
    if (!entity) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(entity).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  public async deleteBrand(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const entity = await this.modelCarService.delete(id);
    if (!entity) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }

}
