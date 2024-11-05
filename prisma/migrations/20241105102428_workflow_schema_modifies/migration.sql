/*
  Warnings:

  - Changed the type of `teamRoles` on the `workFlowProcess` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `toolsUsed` on the `workFlowProcess` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `workFlowSteps` on the `workFlowProcess` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "workFlowProcess" DROP COLUMN "teamRoles",
ADD COLUMN     "teamRoles" JSONB NOT NULL,
DROP COLUMN "toolsUsed",
ADD COLUMN     "toolsUsed" JSONB NOT NULL,
DROP COLUMN "workFlowSteps",
ADD COLUMN     "workFlowSteps" JSONB NOT NULL;
