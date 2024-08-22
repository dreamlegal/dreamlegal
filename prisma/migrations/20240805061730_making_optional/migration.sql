-- AlterTable
ALTER TABLE "companyInfo" ALTER COLUMN "companyName" DROP NOT NULL,
ALTER COLUMN "yearFounded" DROP NOT NULL,
ALTER COLUMN "headQuaters" DROP NOT NULL,
ALTER COLUMN "NameOfFounders" DROP NOT NULL,
ALTER COLUMN "contact" DROP NOT NULL,
ALTER COLUMN "founderVision" DROP NOT NULL,
ALTER COLUMN "TeamSize" DROP NOT NULL,
ALTER COLUMN "PointOfContactName" DROP NOT NULL,
ALTER COLUMN "PointOfContactPhone" DROP NOT NULL,
ALTER COLUMN "PointOfContactDesignation" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user" TEXT,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");
