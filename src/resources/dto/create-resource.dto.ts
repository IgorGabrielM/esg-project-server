import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class CreateResource {
  @ApiProperty()
  title: string;

  @ApiProperty()
  link?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  image_url?: string;

  @ApiProperty()
  parent?: number;
}
