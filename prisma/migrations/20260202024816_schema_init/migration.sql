-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "ban" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "catName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT,
    "subject" TEXT NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "course_price" INTEGER NOT NULL DEFAULT 500,
    "avg_rating" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_slot" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "time_slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "timeSlotId" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tutor_userId_key" ON "tutor"("userId");

-- CreateIndex
CREATE INDEX "tutor_categoryId_idx" ON "tutor"("categoryId");

-- CreateIndex
CREATE INDEX "time_slot_tutorId_idx" ON "time_slot"("tutorId");

-- CreateIndex
CREATE INDEX "reviews_studentId_tutorId_idx" ON "reviews"("studentId", "tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_timeSlotId_key" ON "Bookings"("timeSlotId");

-- AddForeignKey
ALTER TABLE "tutor" ADD CONSTRAINT "tutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor" ADD CONSTRAINT "tutor_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_slot" ADD CONSTRAINT "time_slot_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
