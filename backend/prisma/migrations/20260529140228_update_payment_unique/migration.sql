/*
  Warnings:

  - A unique constraint covering the columns `[paystackReference]` on the table `Payment_Info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_Info_paystackReference_key" ON "Payment_Info"("paystackReference");
