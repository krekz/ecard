-- DropForeignKey
ALTER TABLE "CardGallery" DROP CONSTRAINT "CardGallery_eCardId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_eCardId_fkey";

-- DropForeignKey
ALTER TABLE "ECard" DROP CONSTRAINT "ECard_designId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eCardId_fkey";

-- DropForeignKey
ALTER TABLE "Heirs" DROP CONSTRAINT "Heirs_eCardId_fkey";

-- DropForeignKey
ALTER TABLE "UserVoucher" DROP CONSTRAINT "UserVoucher_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserVoucher" DROP CONSTRAINT "UserVoucher_voucherId_fkey";

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("designId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heirs" ADD CONSTRAINT "Heirs_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardGallery" ADD CONSTRAINT "CardGallery_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoucher" ADD CONSTRAINT "UserVoucher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoucher" ADD CONSTRAINT "UserVoucher_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("code") ON DELETE CASCADE ON UPDATE CASCADE;
