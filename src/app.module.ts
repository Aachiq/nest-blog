import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { User } from './entities/user.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './entities/category.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './entities/post.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    ContactModule,
    CategoriesModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    // is this necessary needed to use migrations
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'M.ysql@123',
      database: 'blog_db',
      entities: [User, Contact, Category, Post, Comment],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
