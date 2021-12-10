import { FileService } from '@car-mkd-systems/api/modules/file/file.service';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { Multer } from 'multer';
import * as uuid from 'uuid';

@Controller('file')
export class FileController {
  public constructor(private readonly fileService: FileService) {
  }

  @Get(':path')
  public async getFile(@Res() res: Response, @Param('path') path: string) {
    const file = await this.fileService.getFile(path);
    return res.status(HttpStatus.OK).json(file).end();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    const newFile = <FileDto>{
      name: file.originalname,
      path: uuid.v4(),
      size: file.size,
      mime: file.mimetype
    };
    const createdFile = await this.fileService.upload(newFile);
    return res.status(HttpStatus.CREATED).json(createdFile).end();
  }
}
