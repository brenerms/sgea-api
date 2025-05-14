import { IsString, IsDateString, IsInt, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  nome: string;

  @IsDateString()
  data: string;

  @IsInt()
  @Min(1)
  capacidadeMaxima: number;

  @IsInt()
  organizadorId: number;
}
