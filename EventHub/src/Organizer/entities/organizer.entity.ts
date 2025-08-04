
import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

  @BeforeInsert()
  generateId() {
    this.id = uuidv4(); // tells TypeORM to run generateId() before saving this entity
  }
}
