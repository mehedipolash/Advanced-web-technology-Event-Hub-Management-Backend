import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Adminmodule } from './admin/admin.module';

@Module({
  imports: [Adminmodule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
