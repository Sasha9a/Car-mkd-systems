import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<T> {
  // public constructor(@InjectRepository(T) private readonly repository: Repository<T>) {}
}
