/*
  Warnings:

  - The `involvement` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `WhyBought` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `GoalBehind` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `easeOfLearning` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `integration` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `support` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roi` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `functionality` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `processStep` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `recommend` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "involvement",
ADD COLUMN     "involvement" TEXT[],
DROP COLUMN "WhyBought",
ADD COLUMN     "WhyBought" TEXT[],
DROP COLUMN "GoalBehind",
ADD COLUMN     "GoalBehind" TEXT[],
DROP COLUMN "easeOfLearning",
ADD COLUMN     "easeOfLearning" INTEGER NOT NULL,
DROP COLUMN "integration",
ADD COLUMN     "integration" INTEGER NOT NULL,
DROP COLUMN "support",
ADD COLUMN     "support" INTEGER NOT NULL,
DROP COLUMN "roi",
ADD COLUMN     "roi" INTEGER NOT NULL,
DROP COLUMN "functionality",
ADD COLUMN     "functionality" JSONB NOT NULL,
DROP COLUMN "processStep",
ADD COLUMN     "processStep" JSONB NOT NULL,
DROP COLUMN "recommend",
ADD COLUMN     "recommend" INTEGER NOT NULL,
ALTER COLUMN "attachement" DROP NOT NULL;
