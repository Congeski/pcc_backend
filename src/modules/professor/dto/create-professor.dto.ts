import { Qualificacao } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @IsOptional()
  cpf: string;

  @IsString()
  @IsOptional()
  titulacao: string;

  @IsString()
  @IsOptional()
  area_atuacao: string;

  @IsBoolean({
    message: 'Informe se é true ou false se o  professor pertence a UEM.',
  })
  @IsNotEmpty({
    message: 'Não houve a informação se o professor pertence a UEM',
  })
  pertence_uem: boolean;

  @IsString()
  @IsOptional()
  formacao_origem: string;

  @IsString()
  @IsOptional()
  nome_social: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a qualificação do professor.' })
  @IsEnum(Qualificacao, {
    message: `O campo qualificação deve ser: ${Qualificacao}`,
  })
  qualificacao: Qualificacao;

  @IsString()
  @IsOptional()
  programa_pos_graduacao_id: string;

  @IsString()
  @IsOptional()
  usuario_id: string;

  @IsString()
  @IsOptional()
  celular: string;
}
