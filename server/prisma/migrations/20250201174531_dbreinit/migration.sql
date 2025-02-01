-- AlterTable
ALTER TABLE "users" ALTER COLUMN "verified" SET DEFAULT false;

-- CreateTable
CREATE TABLE "VerifyUserCodes" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '5 minute'
);

-- CreateIndex
CREATE UNIQUE INDEX "VerifyUserCodes_id_key" ON "VerifyUserCodes"("id");

-- AddForeignKey
ALTER TABLE "VerifyUserCodes" ADD CONSTRAINT "VerifyUserCodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
