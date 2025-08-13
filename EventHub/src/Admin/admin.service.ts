// src/Admin/admin.service.ts
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, MoreThan } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { ChangeStatusDto } from './dto/change-status.dto';
import { Organizer } from 'src/Organizer/entities/organizer.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    @InjectRepository(Organizer)
    private readonly orgRepo: Repository<Organizer>,
    private readonly mailer: MailerService, // ✅ mailer injected
  ) {}

  // 1) Create Admin (+ bcrypt + mail)
  async create(dto: CreateAdminDto) {
    const existing = await this.adminRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const admin = this.adminRepo.create({
      fullName: dto.fullName,
      age: dto.age,
      email: dto.email,
      passwordHash,
      status: 'active',
    });
    const saved = await this.adminRepo.save(admin);

    // Bonus: welcome email (ignore errors in dev)
    try {
      await this.mailer.sendMail({
        to: saved.email,
        subject: 'Welcome to EventHub (Admin)',
        text: `Hello ${saved.fullName}, your admin account is ready.`,
      });
    } catch (_) {}

    const { passwordHash: _ph, ...safe } = saved;
    return safe;
  }

  // 2) Login (Session)
  async login(email: string, password: string, req: any) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    req.session.adminId = admin.id;
    return { message: 'Logged in', adminId: admin.id };
  }

  // 3) Logout
  logout(req: any) {
    const adminId = req.session.adminId;
    req.session.destroy(() => {});
    return { message: 'Logged out', adminId };
  }

  // 4) Me (guarded)
  async me(adminId: number) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');
    const { passwordHash, ...safe } = admin;
    return safe;
  }

  // 5) Update profile (PUT)
  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    Object.assign(admin, dto);
    const saved = await this.adminRepo.save(admin);
    const { passwordHash, ...safe } = saved;
    return safe;
  }

  // 6) Change status (PATCH)
  async changeStatus(id: number, dto: ChangeStatusDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    admin.status = dto.status;
    return this.adminRepo.save(admin);
  }

  // 7) Get all inactive
  async getInactive() {
    return this.adminRepo.find({ where: { status: 'inactive' } });
  }

  // 8) Get older than 40
  async olderThan40() {
    return this.adminRepo.find({ where: { age: MoreThan(40) } });
  }

  // 9) Get all (optional filter)
  async findAll(q?: string) {
    if (q) {
      return this.adminRepo.find({ where: { fullName: ILike(`%${q}%`) } });
    }
    return this.adminRepo.find();
  }

  // 10) Get by id
  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    const { passwordHash, ...safe } = admin;
    return safe;
  }

  // 11) Delete admin
  async remove(id: number) {
    const result = await this.adminRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Admin not found');
    return { message: 'Deleted' };
  }

  // ---- Admin <-> Organizer Relationship ----
  async assignOrganizer(adminId: number, organizerUsername: string) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');

    const organizer = await this.orgRepo.findOne({
      where: { username: organizerUsername },
    });
    if (!organizer) throw new NotFoundException('Organizer not found');

    organizer.createdBy = admin;
    return this.orgRepo.save(organizer);
  }

  async listOrganizers(adminId: number) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');
    return this.orgRepo.find({ where: { createdBy: { id: adminId } } });
  }

  async unassignOrganizer(adminId: number, organizerUsername: string) {
    const organizer = await this.orgRepo.findOne({
      where: { username: organizerUsername },
      relations: ['createdBy'],
    });
    if (!organizer) throw new NotFoundException('Organizer not found');
    if (!organizer.createdBy || organizer.createdBy.id !== adminId) {
      throw new BadRequestException(
        'This organizer is not assigned to the given admin',
      );
    }
    organizer.createdBy = null;
    return this.orgRepo.save(organizer);
  }

  // --- Mailer Test ---
  async sendTestMail(to: string) {
    try {
      await this.mailer.sendMail({
        to,
        subject: 'Test Email from EventHub',
        text: 'Hello! This is a test email from your NestJS application.',
        html: '<b>Hello!</b><br>This is a test email from <i>EventHub</i>.',
      });
      return { message: `Email sent to ${to}` };
    } catch (error) {
      throw new HttpException(
        'Email sending failed: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
