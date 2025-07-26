import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsDate,
    IsEnum,
    isBoolean,
    IsBoolean,
    isInt,
    IsIn,
    isEnum
  } from 'class-validator';
  import {  Qualificacao, ProgramaPosGraduacao, Usuario } from '@prisma/client';
  import { Type } from 'class-transformer';
  const sQualificacao = Object.values(Qualificacao).join(', ')
export class CreateProfessorDto {
    @IsString()
    @IsOptional()
    cpf: string;

    @IsString()
    @IsOptional()
    titulacao:string;

    @IsString()
    @IsOptional()
    area_atuacao: string;

    @IsBoolean({message:"Informe se é true ou false se o  professor pertence a UEM."})
    @IsNotEmpty({message:"Não houve a informação se o professor pertence a UEM"})
    pertence_uem: boolean;

    @IsString()
    @IsOptional()
    formacao_origem: string;
    
    @IsString()
    @IsOptional()
    nome_social:string;

    @IsString()
    @IsNotEmpty({message:"Informe a qualificação do professor."})
    @IsEnum(Qualificacao, {
      message: `O campo qualificação deve ser: ${sQualificacao}`,
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
    celular:string;

    
}
    
