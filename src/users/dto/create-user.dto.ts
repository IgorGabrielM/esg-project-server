import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
} from 'class-validator';


export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  // @ApiProperty({ type: [Number] })
  // @IsOptional()
  // @IsNumber({}, { each: true })
  // readonly posts: CreatePostDto[];
}
