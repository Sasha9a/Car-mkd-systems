import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { ValidateObjectId } from '@car-mkd-systems/api/core/pipes/validate.object.id.pipes';
import { ModelCarService } from '@car-mkd-systems/api/modules/model-car/model.car.service';
import { BrandCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('car-model')
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

  @Delete('/brand/:id')
  public async deleteBrand(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const deletedBrand = await this.modelCarService.deleteBrand(id);
    if (!deletedBrand) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }

}
