import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Delete,
  Put,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';
import { Roadmap } from './entities/roadmap.entity';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';

@Controller('roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapService: RoadmapsService) {}

  @Post()
  async create(@Body() createDiagramDto: CreateRoadmapDto): Promise<Roadmap> {
    try {
      return await this.roadmapService.create(createDiagramDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro no roadmap',
          details: error.message, // Opcional: incluir detalhes do erro original
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<string[]> {
    try {
      return await this.roadmapService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro no roadmap',
          details: error.message, // Opcional: incluir detalhes do erro original
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Roadmap> {
    try {
      return await this.roadmapService.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro no roadmap',
          details: error.message, // Opcional: incluir detalhes do erro original
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDiagramDto: UpdateRoadmapDto,
  ): Promise<Roadmap> {
    try {
      return await this.roadmapService.update(id, updateDiagramDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro no roadmap',
          details: error.message, // Opcional: incluir detalhes do erro original
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.roadmapService.remove(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocorreu um erro no roadmap',
          details: error.message, // Opcional: incluir detalhes do erro original
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
