import { Role } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { ValidateObjectId } from '@car-mkd-systems/api/core/pipes/validate.object.id.pipes';
import { ModelCarService } from '@car-mkd-systems/api/modules/model-car/model.car.service';
import { BrandCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('car-model')
@Role(RoleEnum.ADMIN)
export class ModelCarController {
  public constructor(private readonly modelCarService: ModelCarService) {
  }

  @Get()
  public async getAll(@Res() res: Response) {
    const carModels = await this.modelCarService.findAll();
    return res.status(HttpStatus.OK).json(carModels).end();
  }

  @Post('/model')
  public async createModel(@Res() res: Response, @Body() body: ModelCarFormDto) {
    const firm = await this.modelCarService.checkFirm(body.brand._id);
    if (!firm) {
      return res.status(HttpStatus.NOT_FOUND).json(<ModelCarFormDto>{ model: "Фирма не существует" }).end();
    }
    const createdModel = await this.modelCarService.createModel(body);
    await this.modelCarService.addModelToBrand(createdModel);
    return res.status(HttpStatus.CREATED).json(createdModel).end();
  }

  @Post('/brand')
  public async createBrand(@Res() res: Response, @Body() body: BrandCarFormDto) {
    const createdBrand = await this.modelCarService.createBrand(body);
    return res.status(HttpStatus.CREATED).json(createdBrand).end();
  }

  @Put('/brand/:id')
  public async updateBrand(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: BrandCarFormDto) {
    const updatedBrand = await this.modelCarService.updateBrand(id, body);
    if (!updatedBrand) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(updatedBrand).end();
  }

  @Put('/model/:id')
  public async updateModel(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: ModelCarFormDto) {
    const updatedModel = await this.modelCarService.updateModel(id, body);
    if (!updatedModel) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(updatedModel).end();
  }

  @Delete('/brand/:id')
  public async deleteBrand(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const deletedBrand = await this.modelCarService.deleteBrand(id);
    if (!deletedBrand) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }

  @Delete('/model/:id')
  public async deleteModel(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const deletedModel = await this.modelCarService.deleteModel(id);
    if (!deletedModel) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }

}
