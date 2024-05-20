/*
  Warnings:

  - You are about to drop the column `amount` on the `Voucher` table. All the data in the column will be lost.
  - Added the required column `max_claims` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "amount",
ADD COLUMN     "count_claims" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "max_claims" TEXT NOT NULL;
