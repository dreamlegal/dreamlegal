/*
  Warnings:

  - The `categories` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[];

-- DropEnum
DROP TYPE "PostCategory";
