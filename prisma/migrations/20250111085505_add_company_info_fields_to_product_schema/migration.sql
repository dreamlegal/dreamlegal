-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "CompanyName" TEXT DEFAULT 'abc',
ADD COLUMN     "FoundersNames" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "Headquarters" TEXT DEFAULT 'India';
