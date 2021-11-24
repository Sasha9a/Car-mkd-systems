import { UserSessionDto } from '@car-mkd-systems/shared/dtos/user/user.session.dto';
import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@car-mkd-systems/modules/auth/auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

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

  @Post()
  public async addUser(@Res() res: Response, @Body() body: UserFormDto) {
    body.password = bcrypt.hashSync(body.password, 10);
    const newUser = await this.userService.create(body);
    return res.status(HttpStatus.CREATED).json(newUser).end();
  }

  @Post('/login')
  public async login(@Res() res: Response, @Body() body: UserFormDto) {
    const user = await this.userService.findByLogin(body.login);
    const errors: Record<keyof UserFormDto, any[]> = {
      login: null,
      password: null
    };
    if (!user) {
      errors.login = ['Нет такого аккаунта'];
      return res.status(HttpStatus.NOT_FOUND).json(errors).end();
    }
    if (bcrypt.compareSync(body.password, user.password)) {
      const token = await this.authService.login(user);
      const login: UserSessionDto = {
        _id: user._id,
        login: user.login,
        token: token.accessToken
      }
      return res.status(HttpStatus.OK).json(login).end();
    } else {
      errors.password = ['Неверный пароль'];
      return res.status(HttpStatus.NOT_FOUND).json(errors).end();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  public async profile(@Res() res: Response, @Req() req: Request) {
    return res.status(HttpStatus.OK).json(req.user).end();
  }
}
