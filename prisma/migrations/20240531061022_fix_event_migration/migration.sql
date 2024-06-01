/*
  Warnings:

  - You are about to drop the column `eCardId` on the `Program` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_programId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_eCardId_fkey";

-- DropIndex
DROP INDEX "Program_eCardId_key";

-- AlterTable
ALTER TABLE "ECard" ADD COLUMN     "programId" INTEGER;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "eCardId",
ADD COLUMN     "eventId" INTEGER;

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
