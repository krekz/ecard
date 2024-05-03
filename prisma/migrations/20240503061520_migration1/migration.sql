-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ECard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "father" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "bride" TEXT NOT NULL,
    "groom" TEXT NOT NULL,
    "couple" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "youtubeURL" TEXT,

    CONSTRAINT "ECard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Heirs" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone_number" TEXT,
    "relationship" TEXT,
    "eCardId" TEXT NOT NULL,

    CONSTRAINT "Heirs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "venue" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "gMap" TEXT,
    "greeting" TEXT NOT NULL,
    "eCardId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "bank" TEXT,
    "accountNo" TEXT,
    "qrCode" TEXT,
    "eCardId" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cubaTest" (
    "id" SERIAL NOT NULL,
    "test" VARCHAR(255) NOT NULL,
    "nais" VARCHAR(255) NOT NULL,

    CONSTRAINT "cubaTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ECard_id_key" ON "ECard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_eCardId_key" ON "Event"("eCardId");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_eCardId_key" ON "Donation"("eCardId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heirs" ADD CONSTRAINT "Heirs_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
