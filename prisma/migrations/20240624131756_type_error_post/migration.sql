-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "maintenance" DROP NOT NULL,
ALTER COLUMN "maintenance" SET DATA TYPE TEXT,
ALTER COLUMN "reqForChange" DROP NOT NULL,
ALTER COLUMN "reqForChange" SET DATA TYPE TEXT,
ALTER COLUMN "trainingReq" DROP NOT NULL,
ALTER COLUMN "trainingReq" SET DATA TYPE TEXT,
ALTER COLUMN "dataMigration" DROP NOT NULL,
ALTER COLUMN "dataMigration" SET DATA TYPE TEXT;
