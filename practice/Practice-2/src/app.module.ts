import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { OrganizerModule } from './organizer/organizer.module';

@Module({
  imports: [AdminModule, OrganizerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
