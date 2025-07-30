import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { Qualificacao, ModoApresentacao } from '@prisma/client';

export class CreateProgramaPosGraduacaoDto {
  @IsNumber({}, { message: 'O código deve ser um número.' })
  @IsNotEmpty({ message: 'O código não pode estar vazio.' })
  codigo: number;

  @IsEnum(Qualificacao, { message: 'O tipo de qualificação é inválido.' })
  @IsNotEmpty({ message: 'O tipo não pode estar vazio.' })
  tipo: Qualificacao;

  @IsBoolean({ message: 'O campo "status" deve ser um booleano.' })
  @IsOptional()
  status?: boolean;

  @IsEnum(ModoApresentacao, { message: 'O modo de apresentação é inválido.' })
  @IsNotEmpty({ message: 'A categoria não pode estar vazia.' })
  categoria: ModoApresentacao;

  @IsString({ message: 'A linha de pesquisa deve ser uma string.' })
  @IsNotEmpty({ message: 'A linha de pesquisa não pode estar vazia.' })
  linha_de_pesquisa: string;

  @IsString({ message: 'O curso deve ser uma string.' })
  @IsNotEmpty({ message: 'O curso não pode estar vazio.' })
  curso: string;

  @IsString({ message: 'A cidade deve ser uma string.' })
  @IsOptional()
  cidade?: string;

  @IsString({ message: 'O departamento deve ser uma string.' })
  @IsOptional()
  departamento?: string;

  @IsOptional()
  @IsUUID('4', { message: 'O ID da secretaria deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O ID da secretaria não pode estar vazio.' })
  secretaria_id?: string;
}
