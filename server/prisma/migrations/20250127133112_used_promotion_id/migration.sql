/*
  Warnings:

  - The primary key for the `usedPromotions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `earnedPointtMenuItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "earnedPointtMenuItems" DROP CONSTRAINT "earnedPointtMenuItems_earnedPlacePointId_fkey";

-- DropForeignKey
ALTER TABLE "earnedPointtMenuItems" DROP CONSTRAINT "earnedPointtMenuItems_placeMenuItemVariationId_fkey";

-- AlterTable
ALTER TABLE "usedPromotions" DROP CONSTRAINT "usedPromotions_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "usedPromotions_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "earnedPointtMenuItems";

-- CreateTable
CREATE TABLE "earnedPointMenuItems" (
    "earnedPlacePointId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "placeMenuItemVariationId" INTEGER NOT NULL,

    CONSTRAINT "earnedPointMenuItems_pkey" PRIMARY KEY ("placeMenuItemVariationId","earnedPlacePointId")
);

-- AddForeignKey
ALTER TABLE "earnedPointMenuItems" ADD CONSTRAINT "earnedPointMenuItems_earnedPlacePointId_fkey" FOREIGN KEY ("earnedPlacePointId") REFERENCES "earnedPlacePoints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "earnedPointMenuItems" ADD CONSTRAINT "earnedPointMenuItems_placeMenuItemVariationId_fkey" FOREIGN KEY ("placeMenuItemVariationId") REFERENCES "placeMenuItemVariations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
