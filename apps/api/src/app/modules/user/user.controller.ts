import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user.form.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@car-mkd-systems/modules/auth/auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly authService: AuthService) {
  }

  @Get()
  async getAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Post()
  async addUser(@Res() res: Response, @Body() body: UserFormDto) {
    body.password = bcrypt.hashSync(body.password, 10);
    const newUser = await this.userService.create(body);
    return res.status(HttpStatus.CREATED).json(newUser);
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() body: UserFormDto) {
    const user = await this.userService.findByLogin(body.login);
    if (!user || !body.password) {
      return res.status(HttpStatus.NOT_FOUND).send('Неверные данные');
    }
    if (bcrypt.compareSync(body.password, user.password)) {
      const login = await this.authService.login(user);
      return res.status(HttpStatus.OK).json(login);
    } else {
      return res.status(HttpStatus.NOT_FOUND).send('Неверный пароль');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Res() res: Response, @Req() req: Request) {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
