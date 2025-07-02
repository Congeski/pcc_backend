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
  import { AlunoProfessor, Qualificacao, SolicitacaoBancaProfessor } from '@prisma/client';
  import { Type } from 'class-transformer';
export class CreateProfessorDto {
    @IsString()
    @IsNotEmpty()
    nome_civil: string;

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    formacao_origem: string;


    @IsString()
    @IsOptional()
    area_atuacao: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsString()
    @IsNotEmpty()
    titulacao:string;
    
    @IsString()
    @IsOptional()
    nome_social:string;

    @IsString()
    @IsOptional()
    telefone:string;

    @IsString()
    @IsOptional()
    curso_id: string;  

    @IsString()
    @IsOptional()
    qualificacao: Qualificacao;

    @IsBoolean()
    pertence_uem: boolean;

}
    
