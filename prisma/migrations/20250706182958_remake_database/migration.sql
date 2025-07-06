-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('PROFESSOR', 'ALUNO', 'SECRETARIA');

-- DropForeignKey
ALTER TABLE "aluno" DROP CONSTRAINT "aluno_curso_id_fkey";

-- DropForeignKey
ALTER TABLE "professor" DROP CONSTRAINT "professor_curso_id_fkey";

-- AlterTable
ALTER TABLE "aluno" DROP COLUMN "curso_id",
DROP COLUMN "email_institucional",
DROP COLUMN "nome_civil",
DROP COLUMN "ra",
DROP COLUMN "senha",
ADD COLUMN     "programa_pos_graduacao_id" TEXT,
ADD COLUMN     "usuario_id" TEXT NOT NULL,
ALTER COLUMN "cpf" DROP NOT NULL,
ALTER COLUMN "data_de_ingresso" DROP NOT NULL;

-- AlterTable
ALTER TABLE "professor" DROP COLUMN "curso_id",
DROP COLUMN "email",
DROP COLUMN "nome_civil",
DROP COLUMN "quantidade_orientandos",
DROP COLUMN "senha",
ADD COLUMN     "programa_pos_graduacao_id" TEXT,
ADD COLUMN     "usuario_id" TEXT NOT NULL,
ALTER COLUMN "cpf" DROP NOT NULL,
ALTER COLUMN "formacao_origem" DROP NOT NULL;

-- AlterTable
ALTER TABLE "secretaria" DROP COLUMN "email",
DROP COLUMN "nome_civil",
DROP COLUMN "senha",
ALTER COLUMN "cpf" DROP NOT NULL;

-- AlterTable
ALTER TABLE "solicitacao_defesa" DROP COLUMN "email_aluno",
DROP COLUMN "horario_apresentacao";

-- DropTable
DROP TABLE "curso";

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT NOT NULL,
    "secretariaId" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome_civil" TEXT NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,
    "ultimo_login" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programa_pos_graduacao" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "tipo" "Qualificacao" NOT NULL,
    "categoria" "ModoApresentacao" NOT NULL,
    "codigo" BIGINT NOT NULL,
    "linha_de_pesquisa" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "departamento" TEXT,
    "secretaria_id" TEXT NOT NULL,

    CONSTRAINT "programa_pos_graduacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_usuario_id_key" ON "aluno"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "professor_usuario_id_key" ON "professor"("usuario_id");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_secretariaId_fkey" FOREIGN KEY ("secretariaId") REFERENCES "secretaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_programa_pos_graduacao_id_fkey" FOREIGN KEY ("programa_pos_graduacao_id") REFERENCES "programa_pos_graduacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_programa_pos_graduacao_id_fkey" FOREIGN KEY ("programa_pos_graduacao_id") REFERENCES "programa_pos_graduacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programa_pos_graduacao" ADD CONSTRAINT "programa_pos_graduacao_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
