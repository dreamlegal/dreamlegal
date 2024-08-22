-- CreateTable
CREATE TABLE "userAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "Contact" TEXT,
    "Location" TEXT,
    "Address" TEXT,
    "Designation" TEXT,
    "CompanyType" TEXT,
    "CompanyAddress" TEXT,
    "CompanyEmail" TEXT,

    CONSTRAINT "userAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userAccount" ADD CONSTRAINT "userAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
