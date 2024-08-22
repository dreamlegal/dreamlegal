-- CreateTable
CREATE TABLE "SaveProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT[],

    CONSTRAINT "SaveProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSaveProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSaveProduct_AB_unique" ON "_ProductToSaveProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSaveProduct_B_index" ON "_ProductToSaveProduct"("B");

-- AddForeignKey
ALTER TABLE "SaveProduct" ADD CONSTRAINT "SaveProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSaveProduct" ADD CONSTRAINT "_ProductToSaveProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSaveProduct" ADD CONSTRAINT "_ProductToSaveProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "SaveProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
