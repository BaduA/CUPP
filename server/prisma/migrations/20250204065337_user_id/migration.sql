/*
  Warnings:

  - The primary key for the `placeWorkers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "placeUserRecords" DROP CONSTRAINT "placeUserRecords_userId_fkey";

-- DropForeignKey
ALTER TABLE "placeWorkers" DROP CONSTRAINT "placeWorkers_userId_fkey";

-- DropForeignKey
ALTER TABLE "verifyUserCodes" DROP CONSTRAINT "verifyUserCodes_userId_fkey";

-- AlterTable
ALTER TABLE "placeUserRecords" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "placeWorkers" DROP CONSTRAINT "placeWorkers_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "placeWorkers_pkey" PRIMARY KEY ("userId", "placeId");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AlterTable
ALTER TABLE "verifyUserCodes" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '5 minute';

-- AddForeignKey
ALTER TABLE "placeUserRecords" ADD CONSTRAINT "placeUserRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeWorkers" ADD CONSTRAINT "placeWorkers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifyUserCodes" ADD CONSTRAINT "verifyUserCodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
