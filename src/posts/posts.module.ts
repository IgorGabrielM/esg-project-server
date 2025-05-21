import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { PostComment } from '../post-comments/entities/post-comment.entity'; // Added import

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, PostComment]), // Added PostComment
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
