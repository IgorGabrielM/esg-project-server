import { IsArray, IsOptional, IsObject, IsString } from 'class-validator';

export class UpdateRoadmapDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imgURL?: string;

  @IsArray()
  @IsOptional()
  nodeDataArray?: { key: number; text: string; color: string }[];

  @IsArray()
  @IsOptional()
  linkDataArray?: { from: number; to: number }[];
}
