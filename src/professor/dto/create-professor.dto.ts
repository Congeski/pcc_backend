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
  } from 'class-validator';
  import {  Qualificacao, ProgramaPosGraduacao, Usuario } from '@prisma/client';
  import { Type } from 'class-transformer';
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

    @IsBoolean({message:"Informe se o professor pertence a UEM."})
    @IsNotEmpty()
    pertence_uem: boolean;

    @IsString()
    @IsOptional()
    formacao_origem: string;
    
    @IsString()
    @IsOptional()
    nome_social:string;

    @IsString()
    @IsNotEmpty({message:"Informe a qualificação do professor."})
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
    
