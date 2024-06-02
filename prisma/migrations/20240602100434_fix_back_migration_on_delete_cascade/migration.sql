-- DropForeignKey
ALTER TABLE "ECard" DROP CONSTRAINT "ECard_designId_fkey";

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("designId") ON DELETE CASCADE ON UPDATE CASCADE;
