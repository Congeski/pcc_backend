/*
  Warnings:

  - You are about to alter the column `codigo` on the `programa_pos_graduacao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "programa_pos_graduacao" ALTER COLUMN "codigo" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "solicitacao_defesa" ADD COLUMN     "justificativa" TEXT;
