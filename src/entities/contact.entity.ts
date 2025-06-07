import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  fullname: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  message: string;
  @CreateDateColumn()
  createdAt: Date;
  @Column({ nullable: true })
  nationality: string;
}
