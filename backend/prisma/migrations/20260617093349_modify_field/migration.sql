/*
  Warnings:

  - You are about to drop the column `fezTrackingId` on the `Payment_Info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment_Info" DROP COLUMN "fezTrackingId",
ADD COLUMN     "fezOrderNumber" TEXT;
