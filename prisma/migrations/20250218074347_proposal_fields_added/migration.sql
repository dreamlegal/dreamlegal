-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('UNSAVED', 'SAVED');

-- CreateTable
CREATE TABLE "AiProposal" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "name" TEXT,
    "formData" JSONB NOT NULL,
    "aiResponse" JSONB,
    "versions" JSONB,
    "status" "ProposalStatus" NOT NULL DEFAULT 'UNSAVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiProposal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiProposal_vendorId_idx" ON "AiProposal"("vendorId");
