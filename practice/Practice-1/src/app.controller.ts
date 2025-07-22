import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('student')
  getStudent(): string {
    return this.appService.getStudent();
  }
                              
  @Get('photo/:id')
  getPhoto(@Param('id',ParseIntPipe) photoid: number): string {
    return this.appService.getPhotoService(photoid);
  }

  @Post('pics')
  createPhoto1(@Body('jk') x: string): string {
    return this.appService.createPhoto1Service(x);
  }
  

  // @Post('info')
  // createInfo(@Query('data') y: object): string {
  //   return this.appService.createInfoService(y);
  // }

}
