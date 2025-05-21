import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roadmap } from './entities/roadmap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';

@Injectable()
export class RoadmapsService {
  constructor(
    @InjectRepository(Roadmap)
    private readonly diagramRepository: Repository<Roadmap>,
  ) {}
  async create(createDiagramDto: CreateRoadmapDto): Promise<Roadmap> {
    const diagram = this.diagramRepository.create(createDiagramDto);
    return this.diagramRepository.save(diagram);
  }

  // Obter todos os diagramas
  async findAll(): Promise<any[]> {
    const all = await this.diagramRepository.createQueryBuilder().getMany();
    const justNamesAndDescAttr = all.map((diagram) => {
      return {
        id: diagram.id,
        name: diagram.title,
        description: diagram.description,
        imageUrl: diagram.imgURL,
      };
    });

    return justNamesAndDescAttr;
  }

  // Obter um diagrama por ID
  async findOne(id: number): Promise<Roadmap> {
    const diagram = await this.diagramRepository
      .createQueryBuilder()
      .where({ id })
      .getOne();
    if (!diagram) {
      throw new NotFoundException(`Diagrama com ID ${id} não encontrado`);
    }
    return diagram;
  }

  // Atualizar um diagrama
  async update(
    id: number,
    updateDiagramDto: UpdateRoadmapDto,
  ): Promise<Roadmap> {
    await this.findOne(id); // Verifica se o diagrama existe
    await this.diagramRepository.update(id, updateDiagramDto);
    return this.findOne(id); // Retorna o diagrama atualizado
  }

  // Remover um diagrama
  async remove(id: number): Promise<void> {
    const diagram = await this.findOne(id); // Verifica se o diagrama existe
    await this.diagramRepository.remove(diagram);
  }
}
