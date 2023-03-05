import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { BaseException } from '@car-mkd-systems/api/core/exceptions/base.exception';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { AuthService } from '@car-mkd-systems/api/modules/user/auth.service';
import { UserDto } from '@car-mkd-systems/shared/dtos/user/user.dto';
import { UserLoginFormDto } from '@car-mkd-systems/shared/dtos/user/user.login.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get()
  public async getAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users).end();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/check')
  public async check(@Res() res: Response) {
    return res.status(HttpStatus.NO_CONTENT).end();
  }

  @Roles(RoleEnum.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/:id')
  public async getById(@Res() res: Response, @Param('id') id: number) {
    const entity = await this.userService.findById(id);
    if (!entity) {
      throw new BaseException('Нет такого пользователя');
    }
    return res.status(HttpStatus.OK).json(entity).end();
  }

  @Post('/get-pass')
  public async getPassword(@Res() res: Response, @Body() body: { password: string }) {
    body.password = bcrypt.hashSync(body.password, 10);
    return res.status(HttpStatus.OK).json(body.password).end();
  }

  @Post('/login')
  public async login(@Res() res: Response, @Body() body: UserLoginFormDto) {
    const user = await this.userService.findByLogin(body.login);
    if (!user) {
      throw new BaseException('Нет такого аккаунта', HttpStatus.BAD_REQUEST);
    }
    if (bcrypt.compareSync(body.password, user.password)) {
      const token = this.authService.login(user);
      const login: Partial<UserDto> = {
        id: user.id,
        login: user.login,
        token: token.accessToken,
        roles: user.roles
      };
      await this.userService.setToken(user.id, token.accessToken);
      return res.status(HttpStatus.OK).json(login).end();
    }
    throw new BaseException('Неверный пароль', HttpStatus.BAD_REQUEST);
  }

  @Post('/logout')
  public async logout(@Res() res: Response, @Body() body: UserDto) {
    await this.userService.logout(body.id);
    return res.status(HttpStatus.OK).end();
  }
}
