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
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Organizer)
    private readonly organizerRepo: Repository<Organizer>,

    @InjectRepository(Participant)
    private readonly participantRepo: Repository<Participant>,

    @InjectRepository(Speaker)
    private readonly speakerRepo: Repository<Speaker>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    switch (dto.tipo) {
      case 'organizer':
        return await this.organizerRepo.save(this.organizerRepo.create(dto));
      case 'participant':
        return await this.participantRepo.save(this.participantRepo.create(dto));
      case 'speaker':
        return await this.speakerRepo.save(this.speakerRepo.create(dto));
      default:
        throw new Error('Tipo de usuário inválido');
    }
  }

  async findAll(page = 1, limit = 10): Promise<User[]> {
    return this.userRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
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
}
