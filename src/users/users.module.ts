import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersController } from './users.controller';

import { User } from './entities/user.entity';
import { Organizer } from './entities/organizer.entity';
import { Participant } from './entities/participant.entity';
import { Speaker } from './entities/speaker.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organizer, Participant, Speaker])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
