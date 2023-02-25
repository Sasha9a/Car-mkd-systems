import { BaseService } from '@car-mkd-systems/api/core/services/base.service';
import { UserEntity } from '@car-mkd-systems/shared/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService(UserEntity) {
  public constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    super();
  }

  public async findByLogin(login: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ login: login });
  }

  public async findByToken(token: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ token: token });
  }

  public async setToken(id: number, token: string): Promise<any> {
    return await this.userRepository.update(id, { token });
  }

  public async logout(id: number): Promise<any> {
    return await this.userRepository.update(id, { token: null });
  }
}
