-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bannerImage" TEXT,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefLink" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "RefLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TocItem" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "TocItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefLink" ADD CONSTRAINT "RefLink_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TocItem" ADD CONSTRAINT "TocItem_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
