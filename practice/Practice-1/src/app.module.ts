import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [StudentModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'test',
    autoLoadEntities: true,
    synchronize:true,
  })],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
