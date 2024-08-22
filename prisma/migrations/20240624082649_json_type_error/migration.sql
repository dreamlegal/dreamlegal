/*
  Warnings:

  - The `processLifecycle` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `features` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "processLifecycle",
ADD COLUMN     "processLifecycle" JSONB,
DROP COLUMN "features",
ADD COLUMN     "features" JSONB;
