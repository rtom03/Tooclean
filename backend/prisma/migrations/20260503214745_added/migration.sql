-- AlterTable
ALTER TABLE "Payment_Info" ADD COLUMN     "deliveryStatus" TEXT NOT NULL DEFAULT 'not_created',
ADD COLUMN     "fezTrackingId" TEXT;
