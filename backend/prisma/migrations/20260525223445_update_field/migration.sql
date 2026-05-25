/*
  Warnings:

  - You are about to drop the column `dedicatedAccountName` on the `Payment_Info` table. All the data in the column will be lost.
  - You are about to drop the column `dedicatedAccountNo` on the `Payment_Info` table. All the data in the column will be lost.
  - You are about to drop the column `dedicatedBankName` on the `Payment_Info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment_Info" DROP COLUMN "dedicatedAccountName",
DROP COLUMN "dedicatedAccountNo",
DROP COLUMN "dedicatedBankName";
