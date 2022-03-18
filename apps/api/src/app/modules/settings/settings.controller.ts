import { Roles } from "@car-mkd-systems/api/core/decorators/role.decorator";
import { JwtAuthGuard } from "@car-mkd-systems/api/core/guards/jwt-auth.guard";
import { RoleGuard } from "@car-mkd-systems/api/core/guards/role.guard";
import { ValidateObjectId } from "@car-mkd-systems/api/core/pipes/validate.object.id.pipes";
import { SettingsService } from "@car-mkd-systems/api/modules/settings/settings.service";
import { SettingsDto } from "@car-mkd-systems/shared/dtos/settings/settings.dto";
import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

@Controller('settings')
export class SettingsController {

  public constructor(private readonly settingsService: SettingsService) {
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  public async getAll(@Res() res: Response) {
    let entities = await this.settingsService.findAll();
    return res.status(HttpStatus.OK).json(entities).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/:id')
  public async getById(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const entity = await this.settingsService.findById(id);
    if (!entity) {
      return res.status(HttpStatus.NOT_FOUND).send("Нет такого объекта!").end();
    }
    return res.status(HttpStatus.OK).json(entity).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  public async create(@Res() res: Response, @Body() body: SettingsDto) {
    const entity = await this.settingsService.create(body);
    return res.status(HttpStatus.CREATED).json(entity).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/:id')
  public async update(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: SettingsDto) {
    const entity = await this.settingsService.update(id, body);
    if (!entity) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(entity).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/:id')
  public async delete(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const entity = await this.settingsService.delete(id);
    if (!entity) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }

}
