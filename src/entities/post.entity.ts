import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
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

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
