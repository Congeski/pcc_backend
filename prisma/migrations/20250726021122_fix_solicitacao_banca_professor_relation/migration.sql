/*
  Warnings:

  - You are about to drop the `_SolicitacaoBancaProfessorToSolicitacaoDefesa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `solicitacao_defesa_id` to the `solicitacao_banca_professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SolicitacaoBancaProfessorToSolicitacaoDefesa" DROP CONSTRAINT "_SolicitacaoBancaProfessorToSolicitacaoDefesa_A_fkey";

-- DropForeignKey
ALTER TABLE "_SolicitacaoBancaProfessorToSolicitacaoDefesa" DROP CONSTRAINT "_SolicitacaoBancaProfessorToSolicitacaoDefesa_B_fkey";

-- AlterTable
ALTER TABLE "solicitacao_banca_professor" ADD COLUMN     "solicitacao_defesa_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_SolicitacaoBancaProfessorToSolicitacaoDefesa";

-- AddForeignKey
ALTER TABLE "solicitacao_banca_professor" ADD CONSTRAINT "solicitacao_banca_professor_solicitacao_defesa_id_fkey" FOREIGN KEY ("solicitacao_defesa_id") REFERENCES "solicitacao_defesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
