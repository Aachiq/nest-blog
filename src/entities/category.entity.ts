import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Post, (post) => post.id_category)
  posts: Post[];
}
