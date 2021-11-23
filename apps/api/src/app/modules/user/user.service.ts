import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@car-mkd-systems/shared/schemas/user.schema';
import { Model } from 'mongoose';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';

@Injectable()
export class UserService {
  public constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  public async create(user: UserFormDto): Promise<User> {
    const createUser = await new this.userModel(user);
    return createUser.save();
  }

  public async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  public async findByLogin(login: string): Promise<User> {
    return await this.userModel.findOne({ login: login }).exec();
  }

}
