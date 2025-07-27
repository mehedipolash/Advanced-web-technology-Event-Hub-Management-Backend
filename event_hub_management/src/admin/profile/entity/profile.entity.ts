import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Profile')
export class ProfileEntity {
  @PrimaryColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  photo: string;
}
