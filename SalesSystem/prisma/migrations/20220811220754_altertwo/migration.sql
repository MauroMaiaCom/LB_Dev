/*
  Warnings:

  - A unique constraint covering the columns `[datenow]` on the table `requests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "requests_datenow_key" ON "requests"("datenow");
