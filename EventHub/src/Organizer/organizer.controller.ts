
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { OrganizerDto } from './dto/organizer.dto';


@Controller('organizer')
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: OrganizerDto) {
    return this.organizerService.create(dto);
  }

  @Get('search')
  searchByName(@Query('q') q: string) {
    return this.organizerService.findByFullNameLike(q);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.organizerService.findByUsername(username);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.organizerService.removeByUsername(username);
  }
}
