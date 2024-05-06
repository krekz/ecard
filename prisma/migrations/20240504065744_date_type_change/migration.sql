/*
  Warnings:

  - You are about to drop the `cubaTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_eCardId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eCardId_fkey";

-- DropIndex
DROP INDEX "ECard_id_key";

-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "eCardId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "eCardId" DROP NOT NULL;

-- DropTable
DROP TABLE "cubaTest";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
