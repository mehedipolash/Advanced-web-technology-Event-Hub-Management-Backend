import { Injectable } from '@nestjs/common';
import { OrganizerDto } from './dto/organizer.dto';

@Injectable()
export class OrganizerService {
  create(organizerDto: OrganizerDto, nidImage: Express.Multer.File) {
    return {
      message: 'Organizer created successfully .',
      data: organizerDto,
      nidImage: nidImage.filename,
    };
  }
}
