-- CreateEnum
CREATE TYPE "Qualificacao" AS ENUM ('MESTRADO', 'DOUTORADO');

-- CreateEnum
CREATE TYPE "ModoApresentacao" AS ENUM ('PRESENCIAL', 'REMOTO', 'HIBRIDO');

-- CreateEnum
CREATE TYPE "TipoDefesa" AS ENUM ('QUALIFICACAO_MESTRADO', 'QUALIFICACAO_DOUTORADO', 'DEFESA_DISSERTACAO_MESTRADO', 'DEFESA_TESE_DOUTORADO');

-- CreateEnum
CREATE TYPE "StatusSolicitacao" AS ENUM ('APROVADO', 'REPROVADO', 'EM_ANALISE');

-- CreateEnum
CREATE TYPE "TipoAnexo" AS ENUM ('TEXTO_TRABALHO', 'COMPROVANTE_PUBLICACAO', 'PROPOSTA_QUALIFICACAO', 'DISSERTACAO_FINAL', 'TESE_FINAL', 'AUTORIZACAO_ORIENTADOR', 'CURRICULO_LATTES_MEMBRO_EXTERNO', 'CURRICULO_LATTES_MEMBRO_ESTRANGEIRO');

-- CreateTable
CREATE TABLE "aluno" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ra" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email_institucional" TEXT NOT NULL,
    "email_pessoal" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "nome_civil" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "qualificacao" "Qualificacao" NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome_civil" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "titulacao" TEXT NOT NULL,
    "area_atuacao" TEXT NOT NULL,
    "pertence_uem" BOOLEAN NOT NULL DEFAULT true,
    "quantidade_orientandos" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aluno_professor" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "aluno_id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "coorientador" BOOLEAN NOT NULL,

    CONSTRAINT "aluno_professor_pkey" PRIMARY KEY ("aluno_id","professor_id")
);

-- CreateTable
CREATE TABLE "secretaria" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome_civil" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "acesso_admin" BOOLEAN NOT NULL,

    CONSTRAINT "secretaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membro_externo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "nome_civil" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "titulacao" TEXT NOT NULL,

    CONSTRAINT "membro_externo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membros_banca" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "professor_id" TEXT NOT NULL,
    "membro_externo" TEXT NOT NULL,
    "suplente" BOOLEAN NOT NULL,

    CONSTRAINT "membros_banca_pkey" PRIMARY KEY ("professor_id","membro_externo")
);

-- CreateTable
CREATE TABLE "solicitacao_defesa" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "horario_apresentacao" TIMESTAMP(3) NOT NULL,
    "email_aluno" TEXT NOT NULL,
    "titulo_trabalho" TEXT NOT NULL,
    "local_fisico" TEXT,
    "link_remoto" TEXT,
    "tipo_defesa" "TipoDefesa" NOT NULL,
    "modo_apresentacao" "ModoApresentacao" NOT NULL,
    "status" "StatusSolicitacao" NOT NULL DEFAULT 'EM_ANALISE',

    CONSTRAINT "solicitacao_defesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacao_defesa_anexo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nome_arquivo" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" "TipoAnexo" NOT NULL,
    "solicitacaoDefesaId" TEXT NOT NULL,

    CONSTRAINT "solicitacao_defesa_anexo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "solicitacao_defesa_anexo" ADD CONSTRAINT "solicitacao_defesa_anexo_solicitacaoDefesaId_fkey" FOREIGN KEY ("solicitacaoDefesaId") REFERENCES "solicitacao_defesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
