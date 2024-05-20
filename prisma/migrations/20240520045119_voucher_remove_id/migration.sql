/*
  Warnings:

  - The primary key for the `UserVoucher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Voucher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Voucher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserVoucher" DROP CONSTRAINT "UserVoucher_voucherId_fkey";

-- AlterTable
ALTER TABLE "UserVoucher" DROP CONSTRAINT "UserVoucher_pkey",
ALTER COLUMN "voucherId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserVoucher_pkey" PRIMARY KEY ("userId", "voucherId");

-- AlterTable
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_pkey",
DROP COLUMN "id";

-- AddForeignKey
ALTER TABLE "UserVoucher" ADD CONSTRAINT "UserVoucher_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
