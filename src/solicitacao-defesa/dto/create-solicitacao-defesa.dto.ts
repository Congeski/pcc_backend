// src/solicitacao-defesa/dto/create-solicitacao-defesa.dto.ts
import { IsUUID, IsString, IsDateString, IsEnum, IsArray, IsOptional, isString, IsBoolean } from 'class-validator';
import { TipoDefesa, ModoApresentacao } from '@prisma/client';

export class CreateSolicitacaoDefesaDto {
  @IsEnum(ModoApresentacao)
  modalidade_defesa: ModoApresentacao;

  @IsDateString()
  data_defesa: Date;

  @IsDateString()
  horario_defesa: Date;

  @IsString()
  titulo_trabalho: string;

  @IsEnum(TipoDefesa)
  tipo_defesa: TipoDefesa;

  @IsUUID()
  professor_orientador_id: string;

  @IsUUID()
  professor_coorientador1_id: string;

  @IsUUID()
  professor_coorientador2_id: string;

  @IsArray()
  professores_banca_examinadora: ProfessorBancaDto[];
  
  @IsArray()
  professores_membros_externos: ProfessorMembroExternoBancaDto[];

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsString()
  @IsOptional()
  bloco?: string;

  @IsString()
  @IsOptional()
  sala?: string;

  @IsString()
  @IsOptional()
  link_remoto?: string;

  @IsArray()
  anexos: {
    nome_arquivo: string;
    hash: string;
    url: string;
    tipo: string;
  }[];

  @IsString()
  secretaria_id?: string; // Optional, can be derived from aluno
}

class ProfessorBancaDto {
  @IsUUID()
  id: string;

  @IsBoolean()
  eh_suplente: boolean;

  @IsBoolean()
  copia_impressa: boolean;
}

class ProfessorMembroExternoBancaDto {
  @IsString()
  nome: string;

  @IsString()
  email: string;
}
