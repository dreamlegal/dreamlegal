-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "shares" INTEGER,
    "followers" INTEGER,
    "views" INTEGER,
    "loginsViews" INTEGER,
    "leads" INTEGER,
    "desktopViews" INTEGER,
    "mobileViews" INTEGER,
    "tabletViews" INTEGER,
    "country" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);
