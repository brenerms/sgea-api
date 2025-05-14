import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './entities/session.entity';
import { Lecture } from './entities/lecture.entity';
import { Workshop } from './entities/workshop.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,

    @InjectRepository(Lecture)
    private readonly lectureRepo: Repository<Lecture>,

    @InjectRepository(Workshop)
    private readonly workshopRepo: Repository<Workshop>,

    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(eventId: number, dto: CreateSessionDto): Promise<Session> {
    const event = await this.eventRepo.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Evento não encontrado');

    if (dto.tipo === 'lecture') {
      const lecture = this.lectureRepo.create({ ...dto, evento: event });
      return await this.lectureRepo.save(lecture) as Session;
    }

    if (dto.tipo === 'workshop') {
      const workshop = this.workshopRepo.create({
        ...dto,
        evento: event,
        capacidadeMaxima: dto.capacidadeMaxima,
      });
      return await this.workshopRepo.save(workshop) as Session;
    }

    throw new Error('Tipo de sessão inválido');
  }
}
