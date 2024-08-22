-- CreateTable
CREATE TABLE "companyInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "website" TEXT,
    "yearFounded" TEXT NOT NULL,
    "headQuaters" TEXT NOT NULL,
    "NameOfFounders" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "founderVision" TEXT NOT NULL,
    "regionServed" TEXT,
    "TeamSize" TEXT NOT NULL,
    "Awards" TEXT,
    "PointOfContactName" TEXT NOT NULL,
    "PointOfContactPhone" TEXT NOT NULL,
    "PointOfContactDesignation" TEXT NOT NULL,

    CONSTRAINT "companyInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "companyInfo" ADD CONSTRAINT "companyInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
