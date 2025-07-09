import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  content: string;
  // this optionnal & until finsih with static image all have 1 image then back to upload
  // @Column()
  // image: string;
  @ManyToOne(() => Category, (category) => category.posts)
  id_category: Category;
}
