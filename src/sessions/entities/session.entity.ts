import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ManyToOne,
} from 'typeorm';
import { Event } from 'src/events/entities/event.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export abstract class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  duracao: number; // em horas

  @Column({ default: true })
  inscricaoAutomatica: boolean;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  evento: Event;
}
