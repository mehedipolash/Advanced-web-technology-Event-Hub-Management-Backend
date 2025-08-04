import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { AdminDto } from './dto/admin.dto';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async createAdmin(dto: AdminDto): Promise<Admin> {
    const admin = this.adminRepo.create(dto);
    return this.adminRepo.save(admin);
  }

  async changeStatus(
    id: number,
    status: 'active' | 'inactive',
  ): Promise<Admin> {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    admin.status = status;
    return this.adminRepo.save(admin);
  }

  async getInactiveAdmins(): Promise<Admin[]> {
    return this.adminRepo.find({ where: { status: 'inactive' } });
  }

  async getAdminsOlderThan40(): Promise<Admin[]> {
    return this.adminRepo
      .createQueryBuilder('admin')
      .where('admin.age > :age', { age: 40 })
      .getMany();
  }
}
