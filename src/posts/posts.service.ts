import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private usersService: UsersService,
  ) { }

  async create(createPostDto: CreatePostDto) {
    // Find the user who created the post
    const user = await this.usersService.findOneById(createPostDto.idUser);
    const post = this.postRepository.create({
      title: createPostDto.title,
      text: createPostDto.text,
      user,
    });
    const savedPost = await this.postRepository.save(post);
    // Award points for creating a post
    await this.usersService.addPoints(createPostDto.idUser, 10);
    return savedPost;
  }

  async findAll() {
    try {
      return await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.likes', 'likes')
        .loadRelationCountAndMap('post.commentsCount', 'post.comments')
        .leftJoinAndSelect('post.comments', 'post_comment')
        .leftJoinAndSelect('post_comment.user', 'comment_user')
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.postRepository
        .createQueryBuilder('post')
        .where('post.idPost = :id', { id })
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.likes', 'likes')
        .loadRelationCountAndMap('post.commentsCount', 'post.comments')
        .leftJoinAndSelect('post.comments', 'post_comment')
        .leftJoinAndSelect('post_comment.user', 'comment_user')
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      return await this.postRepository.update(id, updatePostDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.postRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async addLike(id: number, userId: number) {
    try {
      return await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'likes')
        .of(id)
        .add(userId);
    } catch (error) {
      throw error;
    }
  }

  async removeLike(id: number, userId: number) {
    try {
      return await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'likes')
        .of(id)
        .remove(userId);
    } catch (error) {
      throw error;
    }
  }

  async listComments(id: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { idPost: id },
        relations: ['comments'],
      });

      return post.comments;
    } catch (error) {
      throw error;
    }
  }

  async addComment(id: number, commentId: number) {
    try {
      return await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'comments')
        .of(id)
        .add(commentId);
    } catch (error) {
      throw error;
    }
  }

  async removeComment(id: number, commentId: number) {
    try {
      return await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'comments')
        .of(id)
        .remove(commentId);
    } catch (error) {
      throw error;
    }
  }
}
