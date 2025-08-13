import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
// import { Admin } from '../../admin/entities/admin.entity';
import { Admin } from 'src/Admin/entities/admin.entity';

@Entity('organizers')
export class Organizer {
  @PrimaryColumn()
  id: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 150 })
  fullName: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => Admin, (admin) => admin.organizers, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  createdBy?: Admin | null;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
