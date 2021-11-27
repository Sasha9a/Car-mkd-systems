import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { ValidateObjectId } from '@car-mkd-systems/api/core/pipes/validate.object.id.pipes';
import { ModelCarService } from '@car-mkd-systems/api/modules/model-car/model.car.service';
import { FirmCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.form.dto';
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
    const firm = await this.modelCarService.checkFirm(body.firm._id);
    if (!firm) {
      return res.status(HttpStatus.NOT_FOUND).json(<ModelCarFormDto>{ model: "Фирма не существует" }).end();
    }
    const createdModel = await this.modelCarService.createModel(body);
    await this.modelCarService.addModelToFirm(createdModel);
    return res.status(HttpStatus.CREATED).json(createdModel).end();
  }

  @Post('/firm')
  public async createFirm(@Res() res: Response, @Body() body: FirmCarFormDto) {
    const createdFirm = await this.modelCarService.createFirm(body);
    return res.status(HttpStatus.CREATED).json(createdFirm).end();
  }

  // @Delete(':id')
  // public async deleteById(@Res() res: Response, @Param(':id', new ValidateObjectId()) id: string) {
  //   const deletedModelCar = await this.modelCarService.deleteById(id);
  //   if (!deletedModelCar) {
  //     throw new NotFoundException('Нет такого объекта!');
  //   }
  //   return res.status(HttpStatus.OK).end();
  // }
}
