/*
  Warnings:

  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."verification";

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "token" TEXT,
    "identifier" TEXT NOT NULL,
    "value" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);
