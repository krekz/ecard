/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Voucher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Voucher" ALTER COLUMN "amount" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "Voucher"("code");
