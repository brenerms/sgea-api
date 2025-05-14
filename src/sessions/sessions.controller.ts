import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('events/:eventId/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: CreateSessionDto,
  ) {
    return this.sessionsService.create(eventId, dto);
  }
}
