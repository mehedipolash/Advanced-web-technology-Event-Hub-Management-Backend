import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
// import { Organizer } from '../organizer/entities/organizer.entity';
import { Organizer } from 'src/Organizer/entities/organizer.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Organizer]), MailerModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
