-- AlterTable
ALTER TABLE "professor" ADD COLUMN     "curso_id" TEXT;

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
