import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoDto } from './create-aluno.dto';
import { IsString, IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
  @IsOptional()
  @IsUUID()
  orientadorId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  coorientadorIds?: string[];

  @IsOptional()
  @IsString()
  senha?: string;

  @IsOptional()
  @IsString()
  nome_civil?: string;

  @IsOptional()
  @IsString()
  email_pessoal?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsOptional()
  @IsString()
  nome_social?: string;
}