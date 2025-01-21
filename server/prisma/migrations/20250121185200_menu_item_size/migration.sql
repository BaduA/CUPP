/*
  Warnings:

  - Added the required column `size` to the `placeMenuItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "placeMenuItems" ADD COLUMN     "size" TEXT NOT NULL;
