import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserFormDto } from '../../../../../../libs/shared/src/dtos/user.form.dto';
import { Response } from 'express';

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
    const newUser = await this.userService.create(body);
    return res.status(HttpStatus.OK).json(body);
  }
}
