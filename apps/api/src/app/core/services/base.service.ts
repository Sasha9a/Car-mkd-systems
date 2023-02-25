import { Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export interface IBaseService<T> {
  readonly repository: Repository<T>;
  create: <K>(entity: K) => Promise<T>;
  findAll: (options?: FindManyOptions<T>) => Promise<T[]>;
  findOne: (options?: FindOneOptions<T>) => Promise<T>;
  findById: (id: number) => Promise<T>;
  update: <K>(entity: K) => Promise<T>;
  delete: (id: number) => Promise<void>;
}

type Constructor<I> = new (...args: any[]) => I;

export const BaseService = <T>(entity: Constructor<T>): Type<IBaseService<T>> => {
  class BaseServiceClass implements IBaseService<T> {
    @InjectRepository(entity) public readonly repository: Repository<T>;

    public async create<K>(entity: K): Promise<T> {
      return await this.repository.save(entity as any);
    }

    public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
      return await this.repository.find(options);
    }

    public async findOne(options?: FindOneOptions<T>): Promise<T> {
      return await this.repository.findOne(options);
    }

    public async findById(id: number): Promise<T> {
      return await this.repository.findOneBy({ id } as any);
    }

    public async update<K>(entity: K): Promise<T> {
      return await this.repository.save(entity as any);
    }

    public async delete(id: number): Promise<void> {
      await this.repository.delete(id);
    }
  }
  return BaseServiceClass;
};
