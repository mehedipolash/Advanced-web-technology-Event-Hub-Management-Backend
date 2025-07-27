import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { Response } from 'express'; // important

@Controller('profile')
export class ProfileController {
  constructor(private readonly ProfileService: ProfileService) {}

  @Get()
  sayHello(): string {
    return this.ProfileService.sayHello();
  }

  @Get('allusers')
  getUsers(@Res() res: Response): Promise<any> {
    return this.ProfileService.getUsers(res);
  }

  @Get('user/:email')
  getUserByEmail(
    @Param('email') email: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.ProfileService.getUserByEmail(email, res);
  }

  @Post('upload/:email')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 5000000 }, // 5MB
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(
    @Res() res: Response,
    @Param('email') email: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.ProfileService.uploadFile(email, file, res);
  }

  @Get('getimage/:email')
  getUserImage(
    @Param('email') email: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.ProfileService.getUserImage(email, res);
  }
}
