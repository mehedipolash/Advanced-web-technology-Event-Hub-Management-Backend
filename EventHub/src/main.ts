import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    session({
      secret: 'super_session_secret_change_me',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
    }),
  );

  await app.listen(3000);
}
bootstrap();
