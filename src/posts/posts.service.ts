import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAllPosts(): Promise<Post[]> {
    // this return only posts withoutut including categiry data object
    // return this.postsRepository.find();
    return this.postsRepository.find({
      relations: ['id_category'],
    });
  }

  // keep here adding 'null'
  findPostById(id: number): Promise<Post | null> {
    return this.postsRepository.findOne({
      where: { id: id },
      relations: ['id_category'],
    });
  }

  findPostsByCategory(idCategory: number): Promise<Post[]> {
    // this return only posts withoutut including categiry data object
    // return this.postsRepository.find();
    return this.postsRepository.find({
      // where: {
      //     id_category: idCategory
      // },
      where: {
        id_category: {
          id: idCategory,
        },
      },
      relations: ['id_category'],
    });
  }

  //   create(post: Partial<Post>): Promise<Post> {
  //     const newPost = this.postsRepository.create(post);
  //     return this.postsRepository.save(newPost);
  //   }
}
