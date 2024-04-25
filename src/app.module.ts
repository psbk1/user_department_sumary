import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    UserModule
  ],
})
export class AppModule {}
