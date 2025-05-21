import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    return await this.userRepository.save(user);
  }

  async findAllByRank() {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('RANK() OVER (ORDER BY user.points DESC)', 'userRank')
      .orderBy('user.points', 'DESC')
      .getRawMany();
  }

  // Find user by email for authentication
  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Find user by ID
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { idUser: id } });
  }

  async addPoints(id: number, points: number) {
    const user = await this.userRepository.findOne({ where: { idUser: id } });
    if (!user) throw new Error('User not found');
    user.points += points;
    return await this.userRepository.save(user);
  }

  // Update and remove operations are not needed in simplified version
}
