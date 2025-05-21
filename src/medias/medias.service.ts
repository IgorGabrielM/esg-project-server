import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { InterestsService } from 'src/interests/interests.service';
import { Interest } from 'src/interests/entities/interest.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { MediaUser } from 'src/media-user/entities/media-user.entity';

@Injectable()
export class MediasService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,

    @InjectRepository(MediaUser)
    private mediaUserRepository: Repository<MediaUser>,
    private userRepository: UsersService,
    private usersService: UsersService,
    private interestService: InterestsService,
  ) {}
  async create(createMediaDto: CreateMediaDto) {
    try {
      // Verificação da existência do usuário
      let user = null;
      if (createMediaDto.idUser) {
        user = await this.userRepository.findOneById(createMediaDto.idUser);
      }
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Coleta dos interesses
      const interests = [];
      if (createMediaDto.interestIds && createMediaDto.interestIds.length > 0) {
        for (const interestId of createMediaDto.interestIds) {
          const interestItem = await this.interestService.findOne(interestId);
          if (interestItem) {
            interests.push(interestItem);
          }
        }
      }

      // Validação caso nenhum interesse seja encontrado
      if (createMediaDto.interestIds.length > 0 && interests.length === 0) {
        throw new Error('Nenhum interesse válido foi encontrado');
      }

      // Criação da mídia
      const media = this.mediaRepository.create({
        ...createMediaDto,
        interests,
      });

      // Salvamento da mídia
      const savedMedia = await this.mediaRepository.save(media);

      // Criação de entrada MediaUser
      const mediaUser = this.mediaUserRepository.create({
        user,
        media: savedMedia,
      });

      // Salvamento do MediaUser
      await this.mediaUserRepository.save(mediaUser).then(async () => {
        await this.usersService.addPoints(createMediaDto.idUser, 5);
      });

      // Retorna a mídia criada
      return savedMedia;
    } catch (error) {
      // Log do erro (opcional)
      // console.error('Erro ao criar mídia:', error);

      // Lança erro para ser tratado pelo controller
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.mediaRepository
        .createQueryBuilder('media')
        .leftJoinAndSelect('media.interests', 'interests')
        .leftJoinAndSelect('media.users', 'mediaUser') // Join MediaUser
        .leftJoinAndSelect('mediaUser.user', 'users') // Join User from MediaUser
        .getMany();
    } catch (error) {
      throw error; // Consider logging the error
    }
  }

  async findOne(id: number) {
    try {
      return await this.mediaRepository
        .createQueryBuilder('media')
        .where('media.idMedia = :id', { id })
        .leftJoinAndSelect('media.interests', 'interests')
        .leftJoinAndSelect('media.users', 'mediaUser')
        .leftJoinAndSelect('mediaUser.user', 'users')
        .getOne();
    } catch (error) {
      throw error; // Consider logging the error
    }
  }
  async findMediaByUser(userId: number) {
    try {
      return await this.mediaRepository
        .createQueryBuilder('media')
        .leftJoinAndSelect('media.interests', 'interests')
        .leftJoinAndSelect('media.users', 'mediaUser') // Join MediaUser
        .leftJoinAndSelect('mediaUser.user', 'users') // Join User from MediaUser
        .where('mediaUser.userIdUser = :userId', { userId }) // Usando o nome correto da coluna
        .getMany();
    } catch (error) {
      console.error('Error fetching media by user:', error); // Log the error
      throw error;
    }
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    try {
      return await this.mediaRepository.update(id, updateMediaDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.mediaRepository.delete({ idMedia: id });
    } catch (error) {
      throw error;
    }
  }
}
