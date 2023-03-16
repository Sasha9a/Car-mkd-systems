import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { FileEntity } from '@car-mkd-systems/shared/entities/file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  public constructor(@InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) {}

  public async upload(file: FileDto): Promise<FileDto> {
    return await this.fileRepository.save<FileDto>(file);
  }

  public async deleteFile(path: string): Promise<any> {
    return await this.fileRepository.delete({ path: path });
  }
}
