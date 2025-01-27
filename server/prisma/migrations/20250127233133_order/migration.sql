/*
  Warnings:

  - The primary key for the `earnedPointMenuItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `earnedPlacePointId` on the `earnedPointMenuItems` table. All the data in the column will be lost.
  - You are about to drop the `earnedPlacePoints` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderId` to the `earnedPointMenuItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "earnedPlacePoints" DROP CONSTRAINT "earnedPlacePoints_userRecordId_fkey";

-- DropForeignKey
ALTER TABLE "earnedPointMenuItems" DROP CONSTRAINT "earnedPointMenuItems_earnedPlacePointId_fkey";

-- AlterTable
ALTER TABLE "earnedPointMenuItems" DROP CONSTRAINT "earnedPointMenuItems_pkey",
DROP COLUMN "earnedPlacePointId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD CONSTRAINT "earnedPointMenuItems_pkey" PRIMARY KEY ("placeMenuItemVariationId", "orderId");

-- DropTable
DROP TABLE "earnedPlacePoints";

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "earnedPoint" INTEGER NOT NULL,
    "totalMoney" DOUBLE PRECISION NOT NULL,
    "userRecordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userRecordId_fkey" FOREIGN KEY ("userRecordId") REFERENCES "placeUserRecords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "earnedPointMenuItems" ADD CONSTRAINT "earnedPointMenuItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
