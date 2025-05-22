import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { LikePostDto } from './dto/likePost.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.postsService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return await this.postsService.update(+id, updatePostDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.postsService.remove(+id);
    } catch (error) {
      throw error;
    }
  }

  @Post('post/addLike')
  async addLike(@Body() body: LikePostDto) {
    const { idPost, idUser } = body;
    try {
      return await this.postsService.addLike(idPost, idUser);
    } catch (error) {
      throw error;
    }
  }

  @Post('post/removeLike')
  async removeLike(@Body() body: LikePostDto) {
    const { idPost, idUser } = body;
    try {
      return await this.postsService.removeLike(idPost, idUser);
    } catch (error) {
      throw error;
    }
  }
}
