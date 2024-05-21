/*
  Warnings:

  - Changed the type of `max_claims` on the `Voucher` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "max_claims",
ADD COLUMN     "max_claims" INTEGER NOT NULL;
