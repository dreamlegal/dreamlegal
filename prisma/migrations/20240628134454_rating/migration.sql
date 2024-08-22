-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "involvement" TEXT NOT NULL,
    "WhyBought" TEXT NOT NULL,
    "GoalBehind" TEXT NOT NULL,
    "otherProducts" TEXT NOT NULL,
    "oftenUsed" TEXT NOT NULL,
    "overallExperienc" TEXT NOT NULL,
    "bestThing" TEXT NOT NULL,
    "worstThing" TEXT NOT NULL,
    "easeOfLearning" TEXT NOT NULL,
    "integration" TEXT NOT NULL,
    "support" TEXT NOT NULL,
    "roi" TEXT NOT NULL,
    "functionality" TEXT NOT NULL,
    "processStep" TEXT NOT NULL,
    "recommend" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "attachement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
