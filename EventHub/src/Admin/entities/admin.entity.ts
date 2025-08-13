import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Organizer } from '../../Organizer/entities/organizer.entity';


@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'int', unsigned: true })
  age: number;

  @Column({ type: 'varchar', default: 'active' })
  status: 'active' | 'inactive';

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  passwordHash: string;

  @OneToMany(() => Organizer, (org) => org.createdBy)
  organizers: Organizer[];
}
