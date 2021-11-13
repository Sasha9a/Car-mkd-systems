import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user.form.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
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
}
