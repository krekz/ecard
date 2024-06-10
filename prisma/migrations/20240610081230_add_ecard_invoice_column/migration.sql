/*
  Warnings:

  - You are about to drop the column `published` on the `ECard` table. All the data in the column will be lost.
  - Added the required column `expiration` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ECard" DROP COLUMN "published",
ADD COLUMN     "invoice_url" TEXT,
ADD COLUMN     "paid_amount_in_cents" TEXT,
ADD COLUMN     "voucher_id" TEXT;

-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "expiration" TIMESTAMPTZ(3) NOT NULL;
