import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Organizer } from 'src/users/entities/organizer.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  data: Date;

  @Column({ name: 'capacidade_maxima' })
  capacidadeMaxima: number;

  @ManyToOne(() => Organizer, { eager: true })
  organizador: Organizer;
}
