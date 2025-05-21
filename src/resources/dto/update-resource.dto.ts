import { PartialType } from '@nestjs/swagger';
import { CreateResource } from './create-resource.dto';

export class UpdateResourceDto extends PartialType(CreateResource) {}
