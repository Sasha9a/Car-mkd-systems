import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { FileService } from '@car-mkd-systems/api/modules/file/file.service';
import { SettingsService } from "@car-mkd-systems/api/modules/settings/settings.service";
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { WatermarkTypeEnum } from "@car-mkd-systems/shared/enums/watermark.type.enum";
import { Controller, Delete, Get, HttpStatus, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import * as e from 'express/ts4.0';
import * as fs from 'fs';
import * as Jimp from 'jimp';
import { diskStorage } from 'multer';
import { extname } from 'path'
import * as uuid from 'uuid';

@Controller('file')
export class FileController {

  public constructor(private readonly fileService: FileService,
                     private readonly settingsService: SettingsService) {
  }

  @Get(':path')
  public async getFile(@Res() res: Response, @Param('path') path: string) {
    if (fs.existsSync('./public/' + path)) {
      return res.sendFile(path, { root: './public' });
    } else {
      return res.status(HttpStatus.NO_CONTENT).end();
    }
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
    const settings = await this.settingsService.findAll();

    if (settings[0] && settings[0].watermark?.enableWatermark) {
      const watermark = settings[0].watermark;
      let newImage;
      if (watermark.type === WatermarkTypeEnum.TEXT) {
        const fileFont = watermark.font?.find((file) => file.name.endsWith('.fnt'));
        const font = await Jimp.loadFont(fileFont ? ('./public/' + fileFont.path) : Jimp.FONT_SANS_64_BLACK).catch(console.error);
        if (!font) {
          return res.status(HttpStatus.NOT_FOUND).json({ error: 'Ошибка загрузки шрифта' }).end();
        }
        const textWidth = Jimp.measureText(font, watermark.text);
        const textHeight = Jimp.measureTextHeight(font, watermark.text, 150);
        newImage = await new Jimp(textWidth + 15, textHeight + 15, watermark.backgroundColor || 'grey');
        newImage.print(font, 0, 0, {
          text: watermark.text,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        }, newImage.bitmap.width, newImage.bitmap.height);
      } else if (watermark.type === WatermarkTypeEnum.IMAGE) {
        newImage = await Jimp.read('./public/' + watermark.image?.path).catch(console.error);
        if (!newImage) {
          return res.status(HttpStatus.NOT_FOUND).json({ error: 'Ошибка загрузки водяной картинки' }).end();
        }
      }
      const image = await Jimp.read('./public/' + newFile.path);
      newImage.resize(image.bitmap.width * watermark.scale / 100, Jimp.AUTO);

      const X = image.bitmap.width / 2 - newImage.bitmap.width / 2;
      const Y = image.bitmap.height / 2 - newImage.bitmap.height / 2;
      await image.composite(newImage, X, Y, {
        mode: Jimp.BLEND_ADD,
        opacitySource: watermark.opacitySource,
        opacityDest: watermark.opacityDest
      });
      await image.writeAsync('./public/' + newFile.path);
    }

    const createdFile = await this.fileService.upload(newFile);
    return res.status(HttpStatus.CREATED).json(createdFile).end();
  }

  @Roles(RoleEnum.ADMIN)
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

  @Roles(RoleEnum.ADMIN)
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

  @Roles(RoleEnum.ADMIN)
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
