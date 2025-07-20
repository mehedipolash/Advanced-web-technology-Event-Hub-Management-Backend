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

  createPhoto(): string {
    return 'Photo created!';
  }

  createPhoto1Service(x: string): string {
    return `Created with param: ${x}`;
  }
  // createInfoService(value: object): string{
  //   return 
  // }
}
