import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { ValidateObjectId } from '@car-mkd-systems/api/core/pipes/validate.object.id.pipes';
import { ModelCarService } from '@car-mkd-systems/api/modules/model-car/model.car.service';
import { ProductService } from '@car-mkd-systems/api/modules/product/product.service';
import { BrandCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@Controller('car-model')
export class ModelCarController {
  public constructor(private readonly modelCarService: ModelCarService,
                     private readonly productService: ProductService) {
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  public async getAll(@Res() res: Response) {
    const carModels = await this.modelCarService.findAll();
    return res.status(HttpStatus.OK).json(carModels).end();
  }

  @Get('/brand/all')
  public async getAllBrandDropdown(@Res() res: Response) {
    const brands = await this.modelCarService.findAllBrandDropdown();
    return res.status(HttpStatus.OK).json(brands).end();
  }

  @Get('/model/all')
  public async getAllModelDropdown(@Res() res: Response) {
    const models = await this.modelCarService.findAllModelDropdown();
    return res.status(HttpStatus.OK).json(models).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/model')
  public async createModel(@Res() res: Response, @Body() body: ModelCarFormDto) {
    const firm = await this.modelCarService.checkBrand(body.brand._id);
    if (!firm) {
      return res.status(HttpStatus.NOT_FOUND).json(<ModelCarFormDto>{ model: "Фирма не существует" }).end();
    }
    const createdModel = await this.modelCarService.createModel(body);
    await this.modelCarService.addModelToBrand(createdModel);
    return res.status(HttpStatus.CREATED).json(createdModel).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/brand')
  public async createBrand(@Res() res: Response, @Body() body: BrandCarFormDto) {
    const createdBrand = await this.modelCarService.createBrand(body);
    return res.status(HttpStatus.CREATED).json(createdBrand).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/brand/:id')
  public async updateBrand(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: BrandCarFormDto) {
    const updatedBrand = await this.modelCarService.updateBrand(id, body);
    if (!updatedBrand) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(updatedBrand).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/model/:id')
  public async updateModel(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: ModelCarFormDto) {
    const updatedModel = await this.modelCarService.updateModel(id, body);
    if (!updatedModel) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(updatedModel).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/brand/:id')
  public async deleteBrand(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const deletedBrand = await this.modelCarService.deleteBrand(id);
    if (!deletedBrand) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/model/:id')
  public async deleteModel(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const deletedModel = await this.modelCarService.deleteModel(id);
    if (!deletedModel) {
      throw new NotFoundException("Нет такого объекта!");
    }
    await this.productService.deleteModelCar(deletedModel);
    return res.status(HttpStatus.OK).end();
  }

}
