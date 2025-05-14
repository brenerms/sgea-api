import { IsEmail, IsString, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsIn(['organizer', 'participant', 'speaker'])
  tipo: 'organizer' | 'participant' | 'speaker';
}
