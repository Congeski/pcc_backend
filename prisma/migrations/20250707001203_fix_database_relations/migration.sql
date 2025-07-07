/*
  Warnings:

  - You are about to drop the column `telefone` on the `professor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `secretariaId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_usuario` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `ultimo_login` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuario_id]` on the table `secretaria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_institucional]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuario_id` to the `secretaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_institucional` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "professor" DROP CONSTRAINT "professor_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_secretariaId_fkey";

-- DropIndex
DROP INDEX "usuario_email_key";

-- AlterTable
ALTER TABLE "aluno" ADD COLUMN     "celular" TEXT,
ADD COLUMN     "ra" TEXT;

-- AlterTable
ALTER TABLE "professor" DROP COLUMN "telefone",
ADD COLUMN     "celular" TEXT,
ALTER COLUMN "usuario_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "programa_pos_graduacao" ALTER COLUMN "cidade" DROP NOT NULL;

-- AlterTable
ALTER TABLE "secretaria" ADD COLUMN     "celular" TEXT,
ADD COLUMN     "email_pessoal" TEXT,
ADD COLUMN     "usuario_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "email",
DROP COLUMN "secretariaId",
DROP COLUMN "tipo_usuario",
DROP COLUMN "ultimo_login",
ADD COLUMN     "email_institucional" TEXT NOT NULL,
ALTER COLUMN "senha" DROP NOT NULL;

-- DropEnum
DROP TYPE "TipoUsuario";

-- CreateIndex
CREATE UNIQUE INDEX "secretaria_usuario_id_key" ON "secretaria"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_institucional_key" ON "usuario"("email_institucional");

-- AddForeignKey
ALTER TABLE "secretaria" ADD CONSTRAINT "secretaria_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
