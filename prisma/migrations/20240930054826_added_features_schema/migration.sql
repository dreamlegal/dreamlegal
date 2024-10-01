-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "country" TEXT;

-- AlterTable
ALTER TABLE "ProductView" ADD COLUMN     "country" TEXT;

-- AlterTable
ALTER TABLE "Share" ADD COLUMN     "country" TEXT;

-- CreateTable
CREATE TABLE "features" (
    "id" SERIAL NOT NULL,
    "productID" TEXT NOT NULL,
    "country" TEXT,
    "userOrgType" TEXT,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryData" JSONB NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);
