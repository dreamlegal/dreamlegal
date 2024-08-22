-- CreateTable
CREATE TABLE "ClickCount" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "feature" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "ClickCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClickCount_productId_key" ON "ClickCount"("productId");
