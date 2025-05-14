import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Organizer } from 'src/users/entities/organizer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Organizer])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
