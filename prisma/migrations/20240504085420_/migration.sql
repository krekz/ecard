/*
  Warnings:

  - Added the required column `category` to the `ECard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `choosedDesign` to the `ECard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ECard" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "choosedDesign" INTEGER NOT NULL,
ADD COLUMN     "designId" INTEGER;

-- CreateTable
CREATE TABLE "Design" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE SET NULL ON UPDATE CASCADE;
