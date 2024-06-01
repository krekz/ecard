-- DropIndex
DROP INDEX "Program_eventId_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'super_admin';
