import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@car-mkd-systems/shared/schemas/user.schema';
import { Model } from 'mongoose';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user.form.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
  }

  async create(user: UserFormDto): Promise<User> {
    const createUser = await new this.userModel(user);
    return createUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
