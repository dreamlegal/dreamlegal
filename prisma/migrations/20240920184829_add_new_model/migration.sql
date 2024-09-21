-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "ProductName" TEXT NOT NULL,
    "VendorName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organisationName" TEXT NOT NULL,
    "organisationType" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "scheduleDemo" BOOLEAN NOT NULL,
    "teamSize" TEXT NOT NULL,
    "bookingTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
