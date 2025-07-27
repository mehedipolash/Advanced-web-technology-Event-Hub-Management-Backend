import { Controller, Get, Body, Post, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api/getinfo')
  getUserDetails(): object {
    return this.appService.getUserDetails();
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('api/add')
  addUser(@Body() user): object {
    return this.appService.addUser(user);
  }

  @Get('photo/:id')
  getPhoto(@Param('id') photoid: number): string {
    return this.appService.getPhotoService(photoid);
  }

  @Post('pic')
  createPhoto(): string {
    return this.appService.createPhoto();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  
}
