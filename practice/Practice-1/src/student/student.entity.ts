import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('student')
export class StudentEntity {
  @PrimaryColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  paswd: string;
}
