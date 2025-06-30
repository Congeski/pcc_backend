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
  @IsNotEmpty()
  ra: string;

  @IsString()
  @IsOptional()
  senha?: string;

  @IsEmail()
  @IsNotEmpty()
  email_institucional: string;

  @IsEmail()
  @IsOptional()
  email_pessoal?: string;

  @IsString()
  @IsNotEmpty()
  nome_civil: string;

  @IsString()
  @IsOptional()
  nome_social?: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsEnum(Qualificacao)
  @IsNotEmpty()
  qualificacao: Qualificacao;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  data_de_ingresso: Date;

  @IsString()
  @IsOptional()
  curso_id?: string;
}