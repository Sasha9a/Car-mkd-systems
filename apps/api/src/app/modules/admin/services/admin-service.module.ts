import { AdminServiceController } from '@car-mkd-systems/api/modules/admin/services/admin-service.controller';
import { AdminServiceService } from '@car-mkd-systems/api/modules/admin/services/admin-service.service';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  controllers: [AdminServiceController],
  providers: [AdminServiceService],
  exports: [AdminServiceService]
})
export class AdminServiceModule {}
