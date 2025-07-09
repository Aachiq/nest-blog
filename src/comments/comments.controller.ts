import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comment-request.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post('create')
  async createNewComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }
}
