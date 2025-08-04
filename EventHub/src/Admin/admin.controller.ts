import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: AdminDto) {
    return this.adminService.createAdmin(dto);
  }

  @Patch(':id/status')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: 'active' | 'inactive',
  ) {
    return this.adminService.changeStatus(id, status);
  }

  @Get('inactive')
  getInactive() {
    return this.adminService.getInactiveAdmins();
  }

  @Get('older-than-40')
  getOlderThan40() {
    return this.adminService.getAdminsOlderThan40();
  }
}
