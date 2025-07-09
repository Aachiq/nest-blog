import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/comment-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { text, user, post } = createCommentDto;

    const foundUser = await this.userRepository.findOneBy({ id: user });
    const foundPost = await this.postRepository.findOneBy({ id: post });

    if (!foundUser || !foundPost)
      throw new NotFoundException('User or Post not found');

    // Creates a new entity instance and copies all entity properties from this object into a new entity.
    // const newComment = new Comment()
    // const commentDTO = new createCommentDto()
    // newComment.text = commentDTO.text ++
    // Note that it copies only properties that are present in entity schema.
    const newComment = this.commentRepository.create({
      text,
      user: foundUser,
      post: foundPost,
    });

    return await this.commentRepository.save(newComment);
  }
}
