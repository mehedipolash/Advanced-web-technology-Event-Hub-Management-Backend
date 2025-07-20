import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUserDetails(): object {
    return { name: 'Mehedi', age: 25, address: 'Kuril, Dhaka' };
  }

  addUser(user: object): object {
    return { message: 'Added Successful', user: user };
  }

  getPhotoService(photoid: number): string {
    return 'get the photo of id ' + photoid;
  }

  createPhoto(): string {
    return 'create photo';
  }
}
