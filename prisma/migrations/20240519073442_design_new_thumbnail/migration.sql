/*
  Warnings:

  - Added the required column `thumbnail` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVoucher" (
    "voucherId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserVoucher_pkey" PRIMARY KEY ("userId","voucherId")
);

-- AddForeignKey
ALTER TABLE "UserVoucher" ADD CONSTRAINT "UserVoucher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoucher" ADD CONSTRAINT "UserVoucher_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
