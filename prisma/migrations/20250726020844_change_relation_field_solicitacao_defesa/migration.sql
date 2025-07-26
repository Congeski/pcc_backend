/*
  Warnings:

  - You are about to drop the column `professor_banca_id` on the `solicitacao_defesa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "solicitacao_defesa" DROP CONSTRAINT "solicitacao_defesa_professor_banca_id_fkey";

-- AlterTable
ALTER TABLE "solicitacao_defesa" DROP COLUMN "professor_banca_id";

-- CreateTable
CREATE TABLE "_SolicitacaoBancaProfessorToSolicitacaoDefesa" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SolicitacaoBancaProfessorToSolicitacaoDefesa_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SolicitacaoBancaProfessorToSolicitacaoDefesa_B_index" ON "_SolicitacaoBancaProfessorToSolicitacaoDefesa"("B");

-- AddForeignKey
ALTER TABLE "_SolicitacaoBancaProfessorToSolicitacaoDefesa" ADD CONSTRAINT "_SolicitacaoBancaProfessorToSolicitacaoDefesa_A_fkey" FOREIGN KEY ("A") REFERENCES "solicitacao_banca_professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SolicitacaoBancaProfessorToSolicitacaoDefesa" ADD CONSTRAINT "_SolicitacaoBancaProfessorToSolicitacaoDefesa_B_fkey" FOREIGN KEY ("B") REFERENCES "solicitacao_defesa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
