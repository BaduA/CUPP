/*
  Warnings:

  - You are about to drop the column `userRecordId` on the `placePromotions` table. All the data in the column will be lost.
  - You are about to drop the `EarnedPointMenuItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PlaceWorkerRole" AS ENUM ('ADMIN', 'WAITER');

-- DropForeignKey
ALTER TABLE "EarnedPointMenuItem" DROP CONSTRAINT "EarnedPointMenuItem_earnedPlacePointId_fkey";

-- DropForeignKey
ALTER TABLE "EarnedPointMenuItem" DROP CONSTRAINT "EarnedPointMenuItem_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "placePromotions" DROP CONSTRAINT "placePromotions_userRecordId_fkey";

-- AlterTable
ALTER TABLE "placePromotions" DROP COLUMN "userRecordId";

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longtitude" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "district" DROP NOT NULL;

-- DropTable
DROP TABLE "EarnedPointMenuItem";

-- CreateTable
CREATE TABLE "earnedPointtMenuItems" (
    "menuItemId" INTEGER NOT NULL,
    "earnedPlacePointId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "earnedPointtMenuItems_pkey" PRIMARY KEY ("menuItemId","earnedPlacePointId")
);

-- CreateTable
CREATE TABLE "PlaceWorker" (
    "userId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,
    "role" "PlaceWorkerRole" NOT NULL,

    CONSTRAINT "PlaceWorker_pkey" PRIMARY KEY ("userId","placeId")
);

-- CreateTable
CREATE TABLE "usedPromotions" (
    "userRecordId" INTEGER NOT NULL,
    "placePromotionId" INTEGER NOT NULL,

    CONSTRAINT "usedPromotions_pkey" PRIMARY KEY ("placePromotionId","userRecordId")
);

-- AddForeignKey
ALTER TABLE "earnedPointtMenuItems" ADD CONSTRAINT "earnedPointtMenuItems_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "placeMenuItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "earnedPointtMenuItems" ADD CONSTRAINT "earnedPointtMenuItems_earnedPlacePointId_fkey" FOREIGN KEY ("earnedPlacePointId") REFERENCES "earnedPlacePoints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceWorker" ADD CONSTRAINT "PlaceWorker_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceWorker" ADD CONSTRAINT "PlaceWorker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usedPromotions" ADD CONSTRAINT "usedPromotions_userRecordId_fkey" FOREIGN KEY ("userRecordId") REFERENCES "placeUserRecords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usedPromotions" ADD CONSTRAINT "usedPromotions_placePromotionId_fkey" FOREIGN KEY ("placePromotionId") REFERENCES "placePromotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
