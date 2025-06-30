/*
  Warnings:

  - The primary key for the `membros_banca` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `membro_externo` on the `membros_banca` table. All the data in the column will be lost.
  - The required column `id` was added to the `membros_banca` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `aluno_solicitante_id` to the `solicitacao_defesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membros_banca_id` to the `solicitacao_defesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secretaria_id` to the `solicitacao_defesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "membros_banca" DROP CONSTRAINT "membros_banca_pkey",
DROP COLUMN "membro_externo",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "membro_externo_id" TEXT,
ADD CONSTRAINT "membros_banca_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "solicitacao_defesa" ADD COLUMN     "aluno_solicitante_id" TEXT NOT NULL,
ADD COLUMN     "membros_banca_id" TEXT NOT NULL,
ADD COLUMN     "secretaria_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "aluno_professor" ADD CONSTRAINT "aluno_professor_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_professor" ADD CONSTRAINT "aluno_professor_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membros_banca" ADD CONSTRAINT "membros_banca_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membros_banca" ADD CONSTRAINT "membros_banca_membro_externo_id_fkey" FOREIGN KEY ("membro_externo_id") REFERENCES "membro_externo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_defesa" ADD CONSTRAINT "solicitacao_defesa_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_defesa" ADD CONSTRAINT "solicitacao_defesa_aluno_solicitante_id_fkey" FOREIGN KEY ("aluno_solicitante_id") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao_defesa" ADD CONSTRAINT "solicitacao_defesa_membros_banca_id_fkey" FOREIGN KEY ("membros_banca_id") REFERENCES "membros_banca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
