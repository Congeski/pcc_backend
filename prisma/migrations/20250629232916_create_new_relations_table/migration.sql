/*
  Warnings:

  - The primary key for the `aluno_professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `membros_banca_id` on the `solicitacao_defesa` table. All the data in the column will be lost.
  - You are about to drop the column `solicitacaoDefesaId` on the `solicitacao_defesa_anexo` table. All the data in the column will be lost.
  - You are about to drop the `membros_banca` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `aluno_professor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `membro_externo_banca_id` to the `solicitacao_defesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professor_banca_id` to the `solicitacao_defesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solicitacao_defesa_id` to the `solicitacao_defesa_anexo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "membros_banca" DROP CONSTRAINT "membros_banca_membro_externo_id_fkey";

-- DropForeignKey
ALTER TABLE "membros_banca" DROP CONSTRAINT "membros_banca_professor_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitacao_defesa" DROP CONSTRAINT "solicitacao_defesa_membros_banca_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitacao_defesa_anexo" DROP CONSTRAINT "solicitacao_defesa_anexo_solicitacaoDefesaId_fkey";

-- AlterTable
ALTER TABLE "aluno_professor" DROP CONSTRAINT "aluno_professor_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "aluno_professor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "solicitacao_defesa" DROP COLUMN "membros_banca_id",
ADD COLUMN     "membro_externo_banca_id" TEXT NOT NULL,
ADD COLUMN     "professor_banca_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "solicitacao_defesa_anexo" DROP COLUMN "solicitacaoDefesaId",
ADD COLUMN     "solicitacao_defesa_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "membros_banca";

-- CreateTable
CREATE TABLE "aluno_membro_externo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "aluno_id" TEXT NOT NULL,
    "membro_externo_id" TEXT NOT NULL,
    "coorientador" BOOLEAN NOT NULL,

    CONSTRAINT "aluno_membro_externo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacao_banca_professor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "professor_id" TEXT NOT NULL,
    "suplente" BOOLEAN NOT NULL,

    CONSTRAINT "solicitacao_banca_professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacao_banca_membro_externo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "membro_externo_id" TEXT NOT NULL,
    "suplente" BOOLEAN NOT NULL,

    CONSTRAINT "solicitacao_banca_membro_externo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aluno_membro_externo" ADD CONSTRAINT "aluno_membro_externo_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_membro_externo" ADD CONSTRAINT "aluno_membro_externo_membro_externo_id_fkey" FOREIGN KEY ("membro_externo_id") REFERENCES "membro_externo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_banca_professor" ADD CONSTRAINT "solicitacao_banca_professor_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_banca_membro_externo" ADD CONSTRAINT "solicitacao_banca_membro_externo_membro_externo_id_fkey" FOREIGN KEY ("membro_externo_id") REFERENCES "membro_externo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_defesa" ADD CONSTRAINT "solicitacao_defesa_professor_banca_id_fkey" FOREIGN KEY ("professor_banca_id") REFERENCES "solicitacao_banca_professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_defesa" ADD CONSTRAINT "solicitacao_defesa_membro_externo_banca_id_fkey" FOREIGN KEY ("membro_externo_banca_id") REFERENCES "solicitacao_banca_membro_externo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_defesa_anexo" ADD CONSTRAINT "solicitacao_defesa_anexo_solicitacao_defesa_id_fkey" FOREIGN KEY ("solicitacao_defesa_id") REFERENCES "solicitacao_defesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
