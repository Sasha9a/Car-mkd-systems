import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { AuthService } from '@car-mkd-systems/api/modules/user/auth.service';
import { UserSessionDto } from '@car-mkd-systems/shared/dtos/user/user.session.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService,
                     private readonly authService: AuthService) {
  }

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

  @Post('/get-pass')
  public async getPassword(@Res() res: Response, @Body() body: { password: string }) {
    body.password = bcrypt.hashSync(body.password, 10);
    return res.status(HttpStatus.OK).json(body.password).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  public async create(@Res() res: Response, @Body() body: UserFormDto) {
    body.password = bcrypt.hashSync(body.password, 10);
    const newUser = await this.userService.create(body);
    return res.status(HttpStatus.CREATED).json(newUser).end();
  }

  @Post('/login')
  public async login(@Res() res: Response, @Body() body: UserFormDto) {
    const user = await this.userService.findByLogin(body.login);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: { login: ['Нет такого аккаунта'] } }).end();
    }
    if (bcrypt.compareSync(body.password, user.password)) {
      const token = await this.authService.login(user);
      const login: UserSessionDto = {
        _id: user._id,
        login: user.login,
        token: token.accessToken,
        roles: user.roles
      }
      await this.userService.setToken(user._id, token.accessToken);
      return res.status(HttpStatus.OK).json(login).end();
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ error: { password: ['Неверный пароль'] } }).end();
    }
  }

  @Post('/logout')
  public async logout(@Res() res: Response, @Body() body: UserSessionDto) {
    await this.userService.logout(body._id);
    return res.status(HttpStatus.OK).end();
  }

}
