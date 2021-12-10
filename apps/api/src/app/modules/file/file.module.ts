import { FileController } from '@car-mkd-systems/api/modules/file/file.controller';
import { FileService } from '@car-mkd-systems/api/modules/file/file.service';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { File, FileSchema } from '@car-mkd-systems/shared/schemas/file.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: File.name, schema: FileSchema}]),
    UserModule
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
