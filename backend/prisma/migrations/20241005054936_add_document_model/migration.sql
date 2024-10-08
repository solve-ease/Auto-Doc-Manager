-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "issuerAddress" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
