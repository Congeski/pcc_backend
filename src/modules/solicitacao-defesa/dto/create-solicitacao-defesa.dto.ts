import {
  ModoApresentacao,
  Qualificacao,
  StatusSolicitacao,
  TipoAnexo,
  TipoDefesa,
} from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfessorBancaDto)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  professores_banca: ProfessorBancaDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfessorMembroExternoBancaDto)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value || [];
  })
  professores_membros_externos: ProfessorMembroExternoBancaDto[];

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  bloco?: string;

  @IsOptional()
  @IsString()
  sala?: string;

  @IsOptional()
  @IsEnum(StatusSolicitacao)
  status?: StatusSolicitacao;

  @IsOptional()
  @IsString()
  link_remoto?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Anexos)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value || [];
  })
  anexo: Anexos[];

  @IsUUID()
  secretaria_id: string;
}

class ProfessorBancaDto {
  @IsUUID()
  professor_id: string;

  @IsBoolean()
  suplente: boolean;

  @IsBoolean()
  copia_impressa: boolean;
}

class Anexos {
  @IsUUID()
  solicitacao_defesa_id: string;

  @IsString()
  nome_arquivo: string;

  @IsString()
  hash: string;

  @IsString()
  url: string;

  @IsEnum(TipoAnexo)
  tipo: TipoAnexo;
}

class ProfessorMembroExternoBancaDto {
  @IsString()
  nome: string;

  @IsString()
  email: string;

  @IsString()
  @IsEnum(Qualificacao, {
    message: `O campo qualificação deve ser: ${Qualificacao}`,
  })
  qualificacao: Qualificacao;
}
