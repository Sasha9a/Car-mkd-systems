import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { FileService } from '@car-mkd-systems/api/modules/file/file.service';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import * as e from 'express/ts4.0';
import { diskStorage } from 'multer';
import * as uuid from 'uuid';
import { extname } from 'path'
import * as fs from 'fs';

@Controller('file')
export class FileController {
  public constructor(private readonly fileService: FileService) {
  }

  @Get(':path')
  public async getFile(@Res() res: Response, @Param('path') path: string) {
    return res.sendFile(path, { root: './public' });
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public',
      filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, `${uuid.v4()}${extname(file.originalname)}`);
      }
    })
  }))
  public async upload(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    const newFile = <FileDto>{
      name: file.originalname,
      path: file.filename,
      size: file.size,
      mime: file.mimetype
    };
    const createdFile = await this.fileService.upload(newFile);
    return res.status(HttpStatus.CREATED).json(createdFile).end();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':path')
  public async deleteFile(@Res() res: Response, @Param('path') path: string) {
    const deletedFile = await this.fileService.deleteFile(path);
    if (!deletedFile) {
      throw new NotFoundException("Нет такого файла!");
    }
    fs.unlinkSync('./public/' + path);
    return res.status(HttpStatus.OK).end();
  }
}
