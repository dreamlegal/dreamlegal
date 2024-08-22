/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Analytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Analytics_productId_key" ON "Analytics"("productId");
