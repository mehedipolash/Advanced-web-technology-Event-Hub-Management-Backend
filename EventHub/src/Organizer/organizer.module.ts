
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { OrganizerController } from './organizer.controller';
import { OrganizerService } from './organizer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organizer])],
  controllers: [OrganizerController],
  providers: [OrganizerService],
})
export class OrganizerModule {}
