import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entity/profile.entity';
import { Repository } from 'typeorm';
import { Response } from 'express'; // important
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
  ) {}

  sayHello(): string {
    return 'hello customer';
  }

  async getUsers(res: Response): Promise<void> {
    try {
      const allusers = await this.profileRepo.find();
      res.status(200).json({
        success: true,
        status: 200,
        data: { allusers },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `${error} happened. Failed to get.`, // fixed
      });
    }
  }

  async getUserByEmail(email: string, res: Response): Promise<void> {
    try {
      const user = await this.profileRepo.findOneBy({ email });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `${error} happened. Failed to get.`, // fixed
      });
    }
  }

  async uploadFile(
    email: string,
    file: Express.Multer.File,
    res: Response,
  ): Promise<void> {
    try {
      if (!email || !file || !file.filename) {
        res.status(400).json({
          success: false,
          message: 'File not uploaded.',
        });
        return;
      }

      const updatePhotoField = await this.profileRepo.update(
        { email },
        { photo: file.filename },
      );

      if (!updatePhotoField.affected) {
        res.status(404).json({
          success: false,
          message: 'File not updated in database.',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        filename: file.filename,
        path: file.path,
        size: file.size,
        originalname: file.originalname,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'File not uploaded due to an error',
        error: error.message,
      });
    }
  }

  async getUserImage(email: string, res: Response): Promise<void> {
    try {
      const user = await this.profileRepo.findOneBy({ email });

      if (!user || !user.photo) {
        res.status(404).json({
          success: false,
          message: 'User or image not found',
        });
        return;
      }

      const uploadsDir = './uploads';
      const photoPath = path.join(uploadsDir, user.photo);

      if (!fs.existsSync(photoPath)) {
        res.status(404).json({
          success: false,
          message: 'Image file does not exist on server',
        });
        return;
      }

      res.sendFile(user.photo, { root: uploadsDir });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Image not loaded due to an error',
        error: error.message,
      });
    }
  }
}
// test