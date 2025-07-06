import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Qualificacao } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateAlunoDto {
  @IsString()
  usuario_id: string;

  @IsOptional()
  @IsEmail()
  email_pessoal?: string | undefined;

  @IsOptional()
  @IsString()
  nome_social?: string | undefined;

  @IsOptional()
  @IsString()
  cpf?: string | undefined;

  @IsEnum(Qualificacao)
  qualificacao: Qualificacao;
}
