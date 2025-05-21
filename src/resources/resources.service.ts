import { Injectable } from '@nestjs/common';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async findAll(): Promise<Resource[]> {
    const resources = await this.resourceRepository.find({
      relations: ['children', 'parent'],
    });

    // Função para montar a árvore de recursos
    function buildResourceTree(
      resources: Resource[],
      parentId: number | null = null,
    ): any[] {
      return resources
        .filter((resource) =>
          resource.parent
            ? resource.parent.idResource === parentId
            : parentId === null,
        )
        .map((resource) => {
          const children = buildResourceTree(resources, resource.idResource);

          // Se houver filhos, incluímos 'children' e removemos 'parent'
          if (children.length > 0) {
            const { parent, ...resourceWithoutParent } = resource;
            return { ...resourceWithoutParent, children };
          }

          // Se for uma folha, não incluímos 'children' nem 'parent'
          const { children: _children, parent, ...leafResource } = resource;
          return leafResource;
        });
    }

    // Iniciar a árvore a partir dos pais que não têm parent (pai nulo)
    const resourceTree = buildResourceTree(resources);

    return resourceTree;
  }

  findOne(id: number): Promise<Resource> {
    return this.resourceRepository
      .createQueryBuilder('resource')
      .leftJoinAndSelect('resource.children', 'children')
      .leftJoinAndSelect('resource.parent', 'parent')
      .where('resource.idResource = :id', { id })
      .getOne();
  }

  create(resource: Resource): Promise<Resource> {
    return this.resourceRepository.save(resource);
  }

  async update(id: number, updateResourceDto: UpdateResourceDto) {
    return await `This action updates a #${id} resource`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} resource`;
  }
}
