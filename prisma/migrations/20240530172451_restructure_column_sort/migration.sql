-- DropForeignKey
ALTER TABLE "ECard" DROP CONSTRAINT "ECard_userId_fkey";

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
