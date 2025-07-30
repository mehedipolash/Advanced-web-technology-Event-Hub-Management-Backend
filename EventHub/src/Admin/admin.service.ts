

import { Injectable } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  create(adminDto: AdminDto) {
    
    return {
      message: 'Admin created successfully',
      data: adminDto,
    };
  }
}
