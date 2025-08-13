import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { LoginDto } from './dto/login.dto';
import { SessionGuard } from '../common/guards/session.guard';
import { StatusValidationPipe } from './pipes/status-validation.pipe';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // --- Auth & Me ---
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() dto: LoginDto, @Req() req: any) {
    return this.adminService.login(dto.email, dto.password, req);
  }

  @Post('logout')
  @UseGuards(SessionGuard)
  async logout(@Req() req: any) {
    const adminInfo = await this.adminService.me(req.session.adminId); // get admin details before logout
    req.session.destroy(() => {});
    return { message: 'Logged out', admin: adminInfo };
  }

  @Get('me')
  @UseGuards(SessionGuard)
  me(@Req() req: any) {
    return this.adminService.me(req.session.adminId);
  }

  // --- CRUD / filters ---
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get()
  findAll(@Query('q') q?: string) {
    return this.adminService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(id, dto);
  }

  @Patch(':id/status')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', new StatusValidationPipe()) status: 'active' | 'inactive',
  ) {
    return this.adminService.changeStatus(id, { status });
  }

  @Get('filter/inactive')
  getInactive() {
    return this.adminService.getInactive();
  }

  @Get('filter/older-than-40')
  getOlderThan40() {
    return this.adminService.olderThan40();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }

  // --- Relationship (Admin -> Organizers) ---
  @Post(':adminId/organizers/:username/assign')
  assignOrganizer(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Param('username') username: string,
  ) {
    return this.adminService.assignOrganizer(adminId, username);
  }

  @Get(':adminId/organizers')
  listOrganizers(@Param('adminId', ParseIntPipe) adminId: number) {
    return this.adminService.listOrganizers(adminId);
  }

  @Delete(':adminId/organizers/:username')
  unassignOrganizer(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Param('username') username: string,
  ) {
    return this.adminService.unassignOrganizer(adminId, username);
  }

  // --- Mailer test route ---
  @Post('test-mail')
  async sendTestMail(@Body('to') to: string) {
    return this.adminService.sendTestMail(to);
  }
}
