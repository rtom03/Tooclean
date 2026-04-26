/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `dedicatedAccountName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `dedicatedAccountNo` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `dedicatedBankName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paystackCustomerCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paystackReference` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `Create_Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_orderNumber_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
DROP COLUMN "customerName",
DROP COLUMN "dedicatedAccountName",
DROP COLUMN "dedicatedAccountNo",
DROP COLUMN "dedicatedBankName",
DROP COLUMN "email",
DROP COLUMN "items",
DROP COLUMN "orderNumber",
DROP COLUMN "paymentStatus",
DROP COLUMN "paystackCustomerCode",
DROP COLUMN "paystackReference",
DROP COLUMN "phone",
DROP COLUMN "status",
DROP COLUMN "subtotal",
DROP COLUMN "updatedAt",
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "qty" INTEGER NOT NULL,
ALTER COLUMN "total" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "Create_Order";

-- CreateTable
CREATE TABLE "Payment_Info" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "orderDetails" JSONB NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentStatus" TEXT NOT NULL DEFAULT 'unpaid',
    "paystackCustomerCode" TEXT,
    "dedicatedAccountNo" TEXT,
    "dedicatedBankName" TEXT,
    "dedicatedAccountName" TEXT,
    "paystackReference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_Info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_Info_orderNumber_key" ON "Payment_Info"("orderNumber");
