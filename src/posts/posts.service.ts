import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

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
    return await this.postRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    return await this.postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.idPost = :id', { id })
      .getOne();
  }
}
