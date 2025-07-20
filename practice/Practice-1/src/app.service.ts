import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getStudent(): string {
    return 'Student Data';
  }

  getPhotoService(photoid: number): string {
    return `Photo ${photoid}`;
  }

  createPhoto1Service(x: string): string {
    return `Data Created with : ${x}`;
  }
}
