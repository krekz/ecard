/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Design` table. All the data in the column will be lost.
  - Added the required column `thumbnail_url` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Design" DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnail_url" TEXT NOT NULL;
