import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResource } from './dto/create-resource.dto'; // Importando o DTO
import { Resource } from './entities/resource.entity';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async getAll(): Promise<Resource[]> {
    return await this.resourcesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Resource> {
    return await this.resourcesService.findOne(id);
  }

  @Post()
  async create(@Body() createResourceDto: CreateResource): Promise<Resource> {
    // Se um 'parent' foi passado, busca o recurso pai
    let parentResource: Resource = null;
    if (createResourceDto.parent) {
      parentResource = await this.resourcesService.findOne(
        createResourceDto.parent,
      );
    }

    // Cria uma instância de Resource com os dados do DTO
    const newResource = new Resource();
    newResource.title = createResourceDto.title;
    newResource.link = createResourceDto.link;
    newResource.description = createResourceDto.description;
    newResource.parent = parentResource; // Define o parent, se houver

    return await this.resourcesService.create(newResource);
  }
}
