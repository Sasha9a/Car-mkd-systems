import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { File } from '@car-mkd-systems/shared/schemas/file.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FileService {
  public constructor(@InjectModel(File.name) private readonly fileModel: Model<File>) {
  }

  public async upload(file: FileDto): Promise<File> {
    const uploadFile = await new this.fileModel(file);
    return uploadFile.save();
  }

  public async getFile(path: string): Promise<File> {
    return await this.fileModel.findOne({ path: path }).exec();
  }
}
