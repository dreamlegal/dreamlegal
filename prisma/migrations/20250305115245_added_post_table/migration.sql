-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('LEGAL_UPDATES');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bookmarkPost" TEXT[];

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'anonymous',
    "content" TEXT NOT NULL,
    "poll" JSONB,
    "views" INTEGER NOT NULL DEFAULT 0,
    "upvotes" TEXT[],
    "downvotes" TEXT[],
    "categories" "PostCategory"[],
    "replyIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
