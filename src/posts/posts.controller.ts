import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from 'src/entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async showPosts() {
    return this.postService.findAllPosts();
  }

  @Get(':id')
  async showOnePost(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Post | null> {
    return this.postService.findPostById(id);
  }

  @Get('category/:categoryId')
  async showPostsByCatgeiry(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.postService.findPostsByCategory(categoryId);
  }
}
