import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    try {
      return await this.mediasService.create(createMediaDto);
    } catch (error) {
      // Caso ocorra um erro, retorna um erro personalizado ao usuário
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro ao criar a mídia',
          details: error.message, // Opcional: incluir detalhes do erro original
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.mediasService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.mediasService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    try {
      return this.mediasService.findMediaByUser(+userId);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    try {
      return this.mediasService.update(+id, updateMediaDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.mediasService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
