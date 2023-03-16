import { BaseController } from '@car-mkd-systems/api/core/controllers/base.controller';
import { Roles } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { BaseException } from '@car-mkd-systems/api/core/exceptions/base.exception';
import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { SettingsWatermarkFormDto } from '@car-mkd-systems/shared/dtos/admin-services/settings.watermark.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { WatermarkTypeEnum } from '@car-mkd-systems/shared/enums/watermark.type.enum';
import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import Jimp from 'jimp';

@Controller('admin/service')
export class AdminServiceController extends BaseController {
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('water-marks')
  public async waterMarks(@Res() res: Response, @Body() body: SettingsWatermarkFormDto) {
    const bodyParams = this.validate<SettingsWatermarkFormDto>(body, SettingsWatermarkFormDto);

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
      await image.writeAsync('./public/' + img.path).catch(console.error);
    }
    return res.status(HttpStatus.CREATED).json(bodyParams.images).end();
  }
}
