/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Program` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Program_eventId_key" ON "Program"("eventId");
