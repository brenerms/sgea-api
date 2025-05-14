import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Organizer } from './entities/organizer.entity';
import { Participant } from './entities/participant.entity';
import { Speaker } from './entities/speaker.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Organizer) private readonly organizerRepo: Repository<Organizer>,
    @InjectRepository(Participant) private readonly participantRepo: Repository<Participant>,
    @InjectRepository(Speaker) private readonly speakerRepo: Repository<Speaker>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    let user: User;

    if (dto.tipo === 'organizer') {
      user = this.organizerRepo.create(dto);
      return this.organizerRepo.save(user);
    }

    if (dto.tipo === 'participant') {
      user = this.participantRepo.create(dto);
      return this.participantRepo.save(user);
    }

    if (dto.tipo === 'speaker') {
      user = this.speakerRepo.create(dto);
      return this.speakerRepo.save(user);
    }

    throw new Error('Tipo de usuário inválido');
  }

  findOne(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async findAll(page = 1, limit = 10): Promise<{ data: User[]; total: number }> {
  const [data, total] = await this.userRepo.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });

  return { data, total };
}

}
