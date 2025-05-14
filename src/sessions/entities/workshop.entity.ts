import { ChildEntity, Column } from 'typeorm';
import { Session } from './session.entity';

@ChildEntity()
export class Workshop extends Session {
  @Column()
  capacidadeMaxima: number;
}
