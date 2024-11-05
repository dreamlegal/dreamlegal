-- CreateTable
CREATE TABLE "workFlowProcess" (
    "id" TEXT NOT NULL,
    "userID" TEXT,
    "userOrgType" TEXT NOT NULL,
    "userTeamSize" TEXT NOT NULL,
    "categoryOfWorkflow" TEXT NOT NULL,
    "teamRoles" TEXT[],
    "toolsUsed" TEXT[],
    "workFlowSteps" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workFlowProcess_pkey" PRIMARY KEY ("id")
);
