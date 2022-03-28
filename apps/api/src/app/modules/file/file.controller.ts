import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { FileService } from '@car-mkd-systems/api/modules/file/file.service';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Controller, Delete, Get, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import * as e from 'express/ts4.0';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path'
import * as uuid from 'uuid';

@Controller('file')
export class FileController {

  public constructor(private readonly fileService: FileService) {
  }

  @Get(':path')
  public async getFile(@Res() res: Response, @Param('path') path: string) {
    if (fs.existsSync('./public/' + path)) {
      return res.sendFile(path, { root: './public' });
    } else {
      return res.status(HttpStatus.NO_CONTENT).end();
    }
  }

  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
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

    const { error } = await this.fileService.setWatermark(newFile);
    if (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: error }).end();
    }

    const createdFile = await this.fileService.upload(newFile);
    return res.status(HttpStatus.CREATED).json(createdFile).end();
  }

  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('preview')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public',
      filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, `${uuid.v4()}${extname(file.originalname)}`);
      }
    })
  }))
  public async uploadPreview(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    const newFile = <FileDto>{
      name: file.originalname,
      path: file.filename,
      size: file.size,
      mime: file.mimetype
    };

    const { error } = await this.fileService.setWatermark(newFile);
    if (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: error }).end();
    }

    setTimeout(() => {
      if (fs.existsSync('./public/' + newFile.path)) {
        fs.unlinkSync('./public/' + newFile.path);
      }
    }, 5000);
    return res.status(HttpStatus.CREATED).json(newFile).end();
  }

  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('no-watermark')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public',
      filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, `${uuid.v4()}${extname(file.originalname)}`);
      }
    })
  }))
  public async uploadNoWatermark(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    const newFile = <FileDto>{
      name: file.originalname,
      path: file.filename,
      size: file.size,
      mime: file.mimetype
    };
    const createdFile = await this.fileService.upload(newFile);
    return res.status(HttpStatus.CREATED).json(createdFile).end();
  }

  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('font')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public',
      filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, `${file.originalname}`);
      }
    })
  }))
  public async uploadFont(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    const newFile = <FileDto>{
      name: file.originalname,
      path: file.filename,
      size: file.size,
      mime: file.mimetype
    };
    const createdFile = await this.fileService.upload(newFile);
    return res.status(HttpStatus.CREATED).json(createdFile).end();
  }

  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':path')
  public async deleteFile(@Res() res: Response, @Param('path') path: string) {
    await this.fileService.deleteFile(path);
    if (fs.existsSync('./public/' + path)) {
      fs.unlinkSync('./public/' + path);
    }
    return res.status(HttpStatus.OK).end();
  }
}
