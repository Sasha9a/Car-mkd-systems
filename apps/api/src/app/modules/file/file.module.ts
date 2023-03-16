import { FileController } from '@car-mkd-systems/api/modules/file/file.controller';
import { FileService } from '@car-mkd-systems/api/modules/file/file.service';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { FileEntity } from '@car-mkd-systems/shared/entities/file.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), UserModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
