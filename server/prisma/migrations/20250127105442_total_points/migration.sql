/*
  Warnings:

  - You are about to drop the column `totalPoint` on the `placeUserRecords` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "placeUserRecords" DROP COLUMN "totalPoint",
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0;
