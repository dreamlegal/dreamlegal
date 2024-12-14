-- CreateTable
CREATE TABLE "workflowResponse" (
    "id" TEXT NOT NULL,
    "formId" TEXT,
    "userId" TEXT,
    "name" TEXT,
    "categoryOfAnalysis" TEXT,
    "data" JSONB,
    "isSaved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflowResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workflowResponse_formId_key" ON "workflowResponse"("formId");
