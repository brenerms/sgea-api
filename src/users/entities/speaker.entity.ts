import { ChildEntity } from 'typeorm';
import { User } from './user.entity';

@ChildEntity()
export class Speaker extends User {}
