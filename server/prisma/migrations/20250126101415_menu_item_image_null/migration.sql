/*
  Warnings:

  - You are about to drop the `PlaceWorker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlaceWorker" DROP CONSTRAINT "PlaceWorker_placeId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceWorker" DROP CONSTRAINT "PlaceWorker_userId_fkey";

-- AlterTable
ALTER TABLE "placeMenuItems" ALTER COLUMN "imageAddress" DROP NOT NULL;

-- DropTable
DROP TABLE "PlaceWorker";

-- CreateTable
CREATE TABLE "placeWorkers" (
    "userId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,
    "role" "PlaceWorkerRole" NOT NULL,

    CONSTRAINT "placeWorkers_pkey" PRIMARY KEY ("userId","placeId")
);

-- AddForeignKey
ALTER TABLE "placeWorkers" ADD CONSTRAINT "placeWorkers_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeWorkers" ADD CONSTRAINT "placeWorkers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
