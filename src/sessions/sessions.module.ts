import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Lecture } from './entities/lecture.entity';
import { Workshop } from './entities/workshop.entity';
import { Event } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Lecture, Workshop, Event])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
