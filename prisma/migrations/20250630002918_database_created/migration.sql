/*
  Warnings:

  - The values [EM_ANALISE] on the enum `StatusSolicitacao` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `curso` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `local_fisico` on the `solicitacao_defesa` table. All the data in the column will be lost.
  - You are about to drop the column `membro_externo_banca_id` on the `solicitacao_defesa` table. All the data in the column will be lost.
  - You are about to drop the column `modo_apresentacao` on the `solicitacao_defesa` table. All the data in the column will be lost.
  - You are about to drop the `aluno_membro_externo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `membro_externo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `solicitacao_banca_membro_externo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data_de_ingresso` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formacao_origem` to the `professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualificacao` to the `professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `copia_impressa` to the `solicitacao_banca_professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_defesa` to the `solicitacao_defesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario_defesa` to the `solicitacao_defesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modalidade_defesa` to the `solicitacao_defesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusSolicitacao_new" AS ENUM ('APROVADO', 'REPROVADO', 'PENDENTE');
ALTER TABLE "solicitacao_defesa" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "solicitacao_defesa" ALTER COLUMN "status" TYPE "StatusSolicitacao_new" USING ("status"::text::"StatusSolicitacao_new");
ALTER TYPE "StatusSolicitacao" RENAME TO "StatusSolicitacao_old";
ALTER TYPE "StatusSolicitacao_new" RENAME TO "StatusSolicitacao";
DROP TYPE "StatusSolicitacao_old";
ALTER TABLE "solicitacao_defesa" ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
COMMIT;

-- DropForeignKey
ALTER TABLE "aluno_membro_externo" DROP CONSTRAINT "aluno_membro_externo_aluno_id_fkey";

-- DropForeignKey
ALTER TABLE "aluno_membro_externo" DROP CONSTRAINT "aluno_membro_externo_membro_externo_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitacao_banca_membro_externo" DROP CONSTRAINT "solicitacao_banca_membro_externo_membro_externo_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitacao_defesa" DROP CONSTRAINT "solicitacao_defesa_membro_externo_banca_id_fkey";

-- AlterTable
ALTER TABLE "aluno" DROP COLUMN "curso",
ADD COLUMN     "curso_id" TEXT,
ADD COLUMN     "data_de_ingresso" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nome_social" TEXT,
ALTER COLUMN "senha" DROP NOT NULL,
ALTER COLUMN "email_pessoal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "professor" ADD COLUMN     "formacao_origem" TEXT NOT NULL,
ADD COLUMN     "nome_social" TEXT,
ADD COLUMN     "qualificacao" "Qualificacao" NOT NULL,
ADD COLUMN     "telefone" TEXT,
ALTER COLUMN "senha" DROP NOT NULL,
ALTER COLUMN "titulacao" DROP NOT NULL,
ALTER COLUMN "area_atuacao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "secretaria" ADD COLUMN     "nome_social" TEXT;

-- AlterTable
ALTER TABLE "solicitacao_banca_professor" ADD COLUMN     "copia_impressa" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "solicitacao_defesa" DROP COLUMN "local_fisico",
DROP COLUMN "membro_externo_banca_id",
DROP COLUMN "modo_apresentacao",
ADD COLUMN     "bloco" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "data_defesa" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horario_defesa" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "modalidade_defesa" "ModoApresentacao" NOT NULL,
ADD COLUMN     "sala" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDENTE';

-- DropTable
DROP TABLE "aluno_membro_externo";

-- DropTable
DROP TABLE "membro_externo";

-- DropTable
DROP TABLE "solicitacao_banca_membro_externo";

-- CreateTable
CREATE TABLE "curso" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "linha_de_pesquisa" TEXT NOT NULL,
    "duracao_curso" INTEGER NOT NULL,
    "carga_horario" BIGINT NOT NULL,
    "codigo_curso" BIGINT NOT NULL,
    "categoria" "ModoApresentacao" NOT NULL,
    "tipo" "Qualificacao" NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
