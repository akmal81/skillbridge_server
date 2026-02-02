-- DropIndex
DROP INDEX "Bookings_timeSlotId_key";

-- AlterTable
ALTER TABLE "time_slot" ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT true;
