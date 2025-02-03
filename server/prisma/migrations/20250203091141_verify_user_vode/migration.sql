/*
  Warnings:

  - You are about to drop the `VerifyUserCodes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VerifyCodeType" AS ENUM ('Mail', 'Password');

-- DropForeignKey
ALTER TABLE "VerifyUserCodes" DROP CONSTRAINT "VerifyUserCodes_userId_fkey";

-- DropTable
DROP TABLE "VerifyUserCodes";

-- CreateTable
CREATE TABLE "verifyUserCodes" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '5 minute'
);

-- CreateIndex
CREATE UNIQUE INDEX "verifyUserCodes_id_key" ON "verifyUserCodes"("id");

-- AddForeignKey
ALTER TABLE "verifyUserCodes" ADD CONSTRAINT "verifyUserCodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
