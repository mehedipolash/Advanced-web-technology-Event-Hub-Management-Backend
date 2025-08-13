import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminModule } from './Admin/admin.module';
import { OrganizerModule } from './Organizer/organizer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // <- change if needed
      password: '1234', // <- change if needed
      database: 'eventhub_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // dev only
      logging: false,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'your_email@gmail.com',
          pass: 'your_app_password',
        },
      },
      defaults: {
        from: '"EventHub" <no-reply@eventhub.local>',
      },
    }),
    AdminModule,
    OrganizerModule,
  ],
})
export class AppModule {}
