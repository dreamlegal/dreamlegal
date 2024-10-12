-- CreateTable
CREATE TABLE "RfpForm" (
    "id" TEXT NOT NULL,
    "userID" TEXT,
    "userOrgType" TEXT,
    "userTeamSize" TEXT,
    "customisation" TEXT,
    "urgency" JSONB,
    "budget" JSONB,
    "features" JSONB,
    "vendors" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RfpForm_pkey" PRIMARY KEY ("id")
);
