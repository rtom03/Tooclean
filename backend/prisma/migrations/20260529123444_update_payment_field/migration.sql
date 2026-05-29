/*
  Warnings:

  - You are about to drop the column `amountPaid` on the `Payment_Info` table. All the data in the column will be lost.
  - You are about to drop the column `balanceRemaining` on the `Payment_Info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment_Info" DROP COLUMN "amountPaid",
DROP COLUMN "balanceRemaining";
