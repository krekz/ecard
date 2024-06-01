-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "programId" INTEGER;

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "eCardId" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_eCardId_key" ON "Program"("eCardId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
