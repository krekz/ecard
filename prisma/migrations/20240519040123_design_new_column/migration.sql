/*
  Warnings:

  - You are about to drop the column `url` on the `Design` table. All the data in the column will be lost.
  - You are about to drop the column `accountNo` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `ECard` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeURL` on the `ECard` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Plans` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[eCardId]` on the table `Heirs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content_design_url` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `front_design_url` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ECard" DROP CONSTRAINT "ECard_plan_fkey";

-- AlterTable
ALTER TABLE "Design" DROP COLUMN "url",
ADD COLUMN     "content_design_url" TEXT NOT NULL,
ADD COLUMN     "front_design_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "accountNo",
DROP COLUMN "name",
ADD COLUMN     "acc_name" TEXT,
ADD COLUMN     "acc_number" TEXT;

-- AlterTable
ALTER TABLE "ECard" DROP COLUMN "plan",
DROP COLUMN "youtubeURL",
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "youtube_url" TEXT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "time",
ADD COLUMN     "end_time" TEXT NOT NULL,
ADD COLUMN     "start_time" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TIMESTAMPTZ(3);

-- DropTable
DROP TABLE "Plans";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "state" TEXT,
    "district" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMPTZ(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMPTZ(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Heirs_eCardId_key" ON "Heirs"("eCardId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
