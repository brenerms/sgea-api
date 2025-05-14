import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { Organizer } from 'src/users/entities/organizer.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    @InjectRepository(Organizer) private readonly orgRepo: Repository<Organizer>,
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const organizador = await this.orgRepo.findOne({ where: { id: dto.organizadorId } });
    if (!organizador) {
      throw new NotFoundException('Organizador não encontrado');
    }

    const event = this.eventRepo.create({
      nome: dto.nome,
      data: new Date(dto.data),
      capacidadeMaxima: dto.capacidadeMaxima,
      organizador,
    });

    return this.eventRepo.save(event);
  }

  findAll(): Promise<Event[]> {
    return this.eventRepo.find({ relations: ['organizador'] });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepo.findOne({ where: { id }, relations: ['organizador'] });
    if (!event) throw new NotFoundException('Evento não encontrado');
    return event;
  }

  async update(id: number, data: Partial<Event>): Promise<Event> {
    await this.eventRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Evento não encontrado');
    }
  }
}
