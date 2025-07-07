import { Qualificacao } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  isString,
  IsString
} from 'class-validator';

export class CreateAlunoDto {
  
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

  @IsOptional()
  @IsString()
  ra?: string | undefined;

  @IsOptional()
  @IsString()
  celular?: string | undefined;

  @IsString()
  email_institucional: string;

  @IsString()
  nome_civil: string;

  @IsOptional()
  @IsDate()
  data_de_ingresso?: Date | undefined;

  @IsOptional()
  @IsString()
  senha?: string | undefined;

}
