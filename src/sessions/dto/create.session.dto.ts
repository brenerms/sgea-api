import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsIn,
  IsInt,
  Min,
} from 'class-validator';

export class CreateSessionDto {
  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsNumber()
  duracao: number;

  @IsBoolean()
  inscricaoAutomatica: boolean;

  @IsString()
  @IsIn(['lecture', 'workshop'])
  tipo: 'lecture' | 'workshop';

  @IsOptional()
  @IsInt()
  @Min(1)
  capacidadeMaxima?: number;
}
