-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "VendorCredits" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "proposalCredits" INTEGER NOT NULL DEFAULT 10,
    "validationCredits" INTEGER NOT NULL DEFAULT 10,
    "lastRenewalDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextRenewalDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorCredits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnersLeads" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "category" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnersLeads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotentialLeadDetailed" (
    "id" TEXT NOT NULL,
    "role" TEXT,
    "email" TEXT,
    "organisation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PotentialLeadDetailed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentEmailLists" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "contentType" TEXT,
    "contentName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentEmailLists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemoLeads" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoLeads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotentialLead" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "typeOfLead" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PotentialLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorLeads" (
    "id" TEXT NOT NULL,
    "companyName" TEXT,
    "email" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorLeads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorCredits_vendorId_idx" ON "VendorCredits"("vendorId");
