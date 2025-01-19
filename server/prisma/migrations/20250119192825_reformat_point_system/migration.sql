/*
  Warnings:

  - You are about to drop the column `earnedMenuItemId` on the `earnedPlacePoints` table. All the data in the column will be lost.
  - Added the required column `pointValue` to the `placeMenuItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `placeMenuItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "earnedPlacePoints" DROP CONSTRAINT "earnedPlacePoints_earnedMenuItemId_fkey";

-- AlterTable
ALTER TABLE "earnedPlacePoints" DROP COLUMN "earnedMenuItemId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "franchiseCompanies" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "placeMenuItems" ADD COLUMN     "pointValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "EarnedPointMenuItem" (
    "menuItemId" INTEGER NOT NULL,
    "earnedPlacePointId" INTEGER NOT NULL,

    CONSTRAINT "EarnedPointMenuItem_pkey" PRIMARY KEY ("menuItemId","earnedPlacePointId")
);

-- AddForeignKey
ALTER TABLE "EarnedPointMenuItem" ADD CONSTRAINT "EarnedPointMenuItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "placeMenuItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarnedPointMenuItem" ADD CONSTRAINT "EarnedPointMenuItem_earnedPlacePointId_fkey" FOREIGN KEY ("earnedPlacePointId") REFERENCES "earnedPlacePoints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
