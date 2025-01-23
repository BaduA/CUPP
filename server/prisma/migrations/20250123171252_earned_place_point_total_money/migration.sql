/*
  Warnings:

  - Added the required column `totalMoney` to the `earnedPlacePoints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "earnedPlacePoints" ADD COLUMN     "totalMoney" DOUBLE PRECISION NOT NULL;
