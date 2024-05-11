/*
  Warnings:

  - The primary key for the `Design` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Design` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `ECard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[designId]` on the table `Design` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `designId` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `ECard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primary_font` to the `ECard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondary_font` to the `ECard` table without a default value. This is not possible if the table is not empty.
  - Made the column `designId` on table `ECard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eCardId` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ECard" DROP CONSTRAINT "ECard_designId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eCardId_fkey";

-- DropForeignKey
ALTER TABLE "Heirs" DROP CONSTRAINT "Heirs_eCardId_fkey";

-- AlterTable
ALTER TABLE "Design" DROP CONSTRAINT "Design_pkey",
DROP COLUMN "id",
ADD COLUMN     "designId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ECard" DROP COLUMN "category",
ADD COLUMN     "plan" TEXT NOT NULL,
ADD COLUMN     "primary_font" TEXT NOT NULL,
ADD COLUMN     "secondary_font" TEXT NOT NULL,
ALTER COLUMN "designId" SET NOT NULL,
ALTER COLUMN "designId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "eCardId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Heirs" ALTER COLUMN "eCardId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Plans" (
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "CardGallery" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "eCardId" TEXT,

    CONSTRAINT "CardGallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plans_name_key" ON "Plans"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Design_designId_key" ON "Design"("designId");

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("designId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_plan_fkey" FOREIGN KEY ("plan") REFERENCES "Plans"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heirs" ADD CONSTRAINT "Heirs_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardGallery" ADD CONSTRAINT "CardGallery_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
