import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoadmapDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  imgURL: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  nodeDataArray: { key: number; text: string; color: string }[];

  @ApiProperty()
  @IsArray()
  @IsOptional() // É opcional, pode não ser enviado
  linkDataArray?: { from: number; to: number }[];
}
