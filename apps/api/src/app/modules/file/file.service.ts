import { SettingsService } from "@car-mkd-systems/api/modules/settings/settings.service";
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { WatermarkTypeEnum } from "@car-mkd-systems/shared/enums/watermark.type.enum";
import { File } from '@car-mkd-systems/shared/schemas/file.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Jimp from "jimp";
import { Model } from 'mongoose';

@Injectable()
export class FileService {
  public constructor(@InjectModel(File.name) private readonly fileModel: Model<File>,
                     private readonly settingsService: SettingsService) {
  }

  public async upload(file: FileDto): Promise<File> {
    const uploadFile = await new this.fileModel(file);
    return uploadFile.save();
  }

  public async deleteFile(path: string): Promise<any> {
    return await this.fileModel.findOneAndDelete({ path: path }).exec();
  }

  public async setWatermark(newFile: FileDto): Promise<{ error?: string, finish?: boolean }> {
    const settings = await this.settingsService.findAll();

    if (settings[0] && settings[0].watermark?.enableWatermark) {
      const watermark = settings[0].watermark;
      let newImage;
      if (watermark.type === WatermarkTypeEnum.TEXT) {
        const fileFont = watermark.font?.find((file) => file.name.endsWith('.fnt'));
        const font = await Jimp.loadFont(fileFont ? ('./public/' + fileFont.path) : Jimp.FONT_SANS_64_BLACK).catch(console.error);
        if (!font) {
          return { error: 'Ошибка загрузки шрифта' };
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
          return { error: 'Ошибка загрузки водяной картинки' };
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
    return { finish: true };
  }
}
