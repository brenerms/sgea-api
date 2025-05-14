import { ChildEntity } from 'typeorm';
import { Session } from './session.entity';

@ChildEntity()
export class Lecture extends Session {
  // pode adicionar campos específicos aqui futuramente
}
