import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './admin/profile/profile.controller';
import { ProfileService } from './admin/profile/profile.service';
import { ProfileModule } from './admin/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'eventhub',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
