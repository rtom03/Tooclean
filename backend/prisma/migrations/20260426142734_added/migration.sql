/*
  Warnings:

  - Added the required column `state` to the `Payment_Info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment_Info" ADD COLUMN     "state" TEXT NOT NULL;
