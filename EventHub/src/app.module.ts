import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/admin.module';
import { OrganizerModule } from './Organizer/organizer.module';


@Module({
  imports: [AdminModule,OrganizerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
