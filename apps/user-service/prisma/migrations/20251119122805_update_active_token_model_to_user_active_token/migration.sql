/*
  Warnings:

  - You are about to drop the `ActiveToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "TokenType" ADD VALUE 'API_KEY';

-- DropForeignKey
ALTER TABLE "ActiveToken" DROP CONSTRAINT "ActiveToken_userId_fkey";

-- DropTable
DROP TABLE "ActiveToken";

-- CreateTable
CREATE TABLE "UserActiveToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActiveToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserActiveToken_userId_idx" ON "UserActiveToken"("userId");

-- CreateIndex
CREATE INDEX "UserActiveToken_expiresAt_idx" ON "UserActiveToken"("expiresAt");

-- CreateIndex
CREATE INDEX "UserActiveToken_userId_type_idx" ON "UserActiveToken"("userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "UserActiveToken_tokenHash_type_key" ON "UserActiveToken"("tokenHash", "type");

-- AddForeignKey
ALTER TABLE "UserActiveToken" ADD CONSTRAINT "UserActiveToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
