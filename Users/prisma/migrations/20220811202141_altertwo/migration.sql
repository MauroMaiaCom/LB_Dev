/*
  Warnings:

  - Added the required column `marca` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "marca" TEXT NOT NULL;