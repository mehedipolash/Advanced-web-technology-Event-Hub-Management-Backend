import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getAdmin(): string {
    return 'hello admin';
  }

  getAdminById(id: string): string {
    return 'admin id : ' + id;
  }
}
