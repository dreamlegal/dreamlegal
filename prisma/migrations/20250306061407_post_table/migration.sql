/*
  Warnings:

  - You are about to drop the column `parentId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_parentId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "parentId",
ADD COLUMN     "replyIds" TEXT[];
