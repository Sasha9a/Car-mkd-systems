import { BaseController } from '@car-mkd-systems/api/core/controllers/base.controller';
import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { BaseException } from '@car-mkd-systems/api/core/exceptions/base.exception';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { WatermarkFormDto } from '@car-mkd-systems/shared/dtos/admin-services/watermark.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { WatermarkTypeEnum } from '@car-mkd-systems/shared/enums/watermark.type.enum';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import fs from 'fs';
import Jimp from 'jimp';
import JSZip from 'jszip';
import * as uuid from 'uuid';

@Controller('admin/service')
export class AdminServiceController extends BaseController {
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('water-marks')
  public async waterMarks(@Res() res: Response, @Body() body: WatermarkFormDto) {
    const bodyParams = this.validate<WatermarkFormDto>(body, WatermarkFormDto);

    let newImage;
    if (bodyParams.type === WatermarkTypeEnum.TEXT) {
      const fileFont = bodyParams.font?.find((file) => file.name.endsWith('.fnt'));
      const font = await Jimp.loadFont(fileFont ? './public/' + fileFont.path : Jimp.FONT_SANS_64_BLACK).catch(console.error);
      if (!font) {
        throw new BaseException('Ошибка загрузки шрифта');
      }
      const textWidth = Jimp.measureText(font, bodyParams.text);
      const textHeight = Jimp.measureTextHeight(font, bodyParams.text, 150);
      newImage = await new Jimp(textWidth + 15, textHeight + 15, bodyParams.backgroundColor || 'grey');
      newImage.print(
        font,
        0,
        0,
        {
          text: bodyParams.text,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },
        newImage.bitmap.width,
        newImage.bitmap.height
      );
    } else if (bodyParams.type === WatermarkTypeEnum.IMAGE) {
      newImage = await Jimp.read('./public/' + bodyParams.imageWatermark?.path).catch(console.error);
      if (!newImage) {
        throw new BaseException('Ошибка загрузки водяной картинки');
      }
    }

    const zip = new JSZip();
    for (const img of bodyParams.images) {
      const image = await Jimp.read('./public/' + img.path);
      newImage.resize((image.bitmap.width * bodyParams.scale) / 100, Jimp.AUTO);

      const X = image.bitmap.width / 2 - newImage.bitmap.width / 2;
      const Y = image.bitmap.height / 2 - newImage.bitmap.height / 2;
      await image.composite(newImage, X, Y, {
        mode: Jimp.BLEND_ADD,
        opacitySource: bodyParams.opacitySource,
        opacityDest: bodyParams.opacityDest
      });
      const newNameFile = uuid.v4() + img.path.slice(img.path.indexOf('.'));
      fs.writeFileSync('./public/' + newNameFile, fs.readFileSync('./public/' + img.path));
      await image.writeAsync('./public/' + newNameFile).catch(console.error);
      zip.file(newNameFile, fs.readFileSync('./public/' + newNameFile));
      fs.unlinkSync('./public/' + newNameFile);
    }
    const nameArchive = uuid.v4() + '.zip';
    zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream('./public/' + nameArchive))
      .on('finish', () => {
        return res.sendFile(nameArchive, { root: './public' });
      });
  }
}
