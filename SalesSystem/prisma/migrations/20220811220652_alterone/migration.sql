/*
  Warnings:

  - Added the required column `datenow` to the `requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "datenow" TEXT NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL;
