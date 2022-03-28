import { Roles } from "@car-mkd-systems/api/core/decorators/role.decorator";
import { JwtAuthGuard } from "@car-mkd-systems/api/core/guards/jwt-auth.guard";
import { RoleGuard } from "@car-mkd-systems/api/core/guards/role.guard";
import { ValidateObjectId } from "@car-mkd-systems/api/core/pipes/validate.object.id.pipes";
import { HelpService } from "@car-mkd-systems/api/modules/help/help.service";
import { HelpFormDto } from "@car-mkd-systems/shared/dtos/help/help.form.dto";
import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

@Controller('help')
export class HelpController {

  public constructor(private readonly helpService: HelpService) {
  }

  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  public async getAll(@Res() res: Response) {
    const entities = await this.helpService.findAll();
    return res.status(HttpStatus.OK).json(entities).end();
  }

  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/:id')
  public async getById(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const entity = await this.helpService.findById(id);
    if (!entity) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(entity).end();
  }

  @Roles(RoleEnum.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  public async create(@Res() res: Response, @Body() body: HelpFormDto) {
    const entity = await this.helpService.create(body);
    return res.status(HttpStatus.CREATED).json(entity).end();
  }

  @Roles(RoleEnum.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/:id')
  public async update(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string, @Body() body: HelpFormDto) {
    const entity = await this.helpService.update(id, body);
    if (!entity) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).json(entity).end();
  }

  @Roles(RoleEnum.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/:id')
  public async delete(@Res() res: Response, @Param('id', new ValidateObjectId()) id: string) {
    const entity = await this.helpService.delete(id);
    if (!entity) {
      throw new NotFoundException("Нет такого объекта!");
    }
    return res.status(HttpStatus.OK).end();
  }

}
