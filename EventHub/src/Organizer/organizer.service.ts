
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Organizer } from './entities/organizer.entity';
import { OrganizerDto } from './dto/organizer.dto';

@Injectable()
export class OrganizerService {
  constructor(
    @InjectRepository(Organizer)
    private readonly organizerRepo: Repository<Organizer>,
  ) {}

  async create(dto: OrganizerDto): Promise<Organizer> {
    const organizer = this.organizerRepo.create(dto);
    return this.organizerRepo.save(organizer);
  }

  async findByUsername(username: string): Promise<Organizer> {
    const organizer = await this.organizerRepo.findOneBy({ username });
    if (!organizer) {
      throw new NotFoundException('User not found!');
    }
    return organizer;
  }

  async findByFullNameLike(substring: string): Promise<Organizer[]> {
    return this.organizerRepo.find({
      where: { fullName: ILike(`%${substring}%`) },
    });
  }

  async removeByUsername(username: string): Promise<void> {
    const result = await this.organizerRepo.delete({ username });
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
