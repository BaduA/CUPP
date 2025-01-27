/*
  Warnings:

  - The primary key for the `earnedPointtMenuItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `menuItemId` on the `earnedPointtMenuItems` table. All the data in the column will be lost.
  - You are about to drop the column `pointValue` on the `placeMenuItems` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `placeMenuItems` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `placeMenuItems` table. All the data in the column will be lost.
  - Added the required column `placeMenuItemVariationId` to the `earnedPointtMenuItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appFeedingRate` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "earnedPointtMenuItems" DROP CONSTRAINT "earnedPointtMenuItems_menuItemId_fkey";

-- AlterTable
ALTER TABLE "earnedPointtMenuItems" DROP CONSTRAINT "earnedPointtMenuItems_pkey",
DROP COLUMN "menuItemId",
ADD COLUMN     "placeMenuItemVariationId" INTEGER NOT NULL,
ADD CONSTRAINT "earnedPointtMenuItems_pkey" PRIMARY KEY ("placeMenuItemVariationId", "earnedPlacePointId");

-- AlterTable
ALTER TABLE "placeMenuItems" DROP COLUMN "pointValue",
DROP COLUMN "price",
DROP COLUMN "size";

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "appFeedingRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalGivenPoints" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalUsedPromotionPoints" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "placeMenuItemVariations" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "pointValue" DOUBLE PRECISION NOT NULL,
    "size" TEXT NOT NULL,
    "isWithDiscount" BOOLEAN NOT NULL,
    "menuItemId" INTEGER NOT NULL,

    CONSTRAINT "placeMenuItemVariations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "earnedPointtMenuItems" ADD CONSTRAINT "earnedPointtMenuItems_placeMenuItemVariationId_fkey" FOREIGN KEY ("placeMenuItemVariationId") REFERENCES "placeMenuItemVariations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeMenuItemVariations" ADD CONSTRAINT "placeMenuItemVariations_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "placeMenuItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
