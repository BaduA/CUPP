-- DropForeignKey
ALTER TABLE "PlaceWorker" DROP CONSTRAINT "PlaceWorker_placeId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceWorker" DROP CONSTRAINT "PlaceWorker_userId_fkey";

-- DropForeignKey
ALTER TABLE "earnedPlacePoints" DROP CONSTRAINT "earnedPlacePoints_userRecordId_fkey";

-- DropForeignKey
ALTER TABLE "placeImages" DROP CONSTRAINT "placeImages_placeId_fkey";

-- DropForeignKey
ALTER TABLE "placeMenuItems" DROP CONSTRAINT "placeMenuItems_placeId_fkey";

-- DropForeignKey
ALTER TABLE "placePromotions" DROP CONSTRAINT "placePromotions_placeId_fkey";

-- DropForeignKey
ALTER TABLE "placeUserRecords" DROP CONSTRAINT "placeUserRecords_placeId_fkey";

-- DropForeignKey
ALTER TABLE "placeUserRecords" DROP CONSTRAINT "placeUserRecords_userId_fkey";

-- DropForeignKey
ALTER TABLE "usedPromotions" DROP CONSTRAINT "usedPromotions_userRecordId_fkey";

-- AddForeignKey
ALTER TABLE "earnedPlacePoints" ADD CONSTRAINT "earnedPlacePoints_userRecordId_fkey" FOREIGN KEY ("userRecordId") REFERENCES "placeUserRecords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeImages" ADD CONSTRAINT "placeImages_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeMenuItems" ADD CONSTRAINT "placeMenuItems_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placePromotions" ADD CONSTRAINT "placePromotions_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeUserRecords" ADD CONSTRAINT "placeUserRecords_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeUserRecords" ADD CONSTRAINT "placeUserRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceWorker" ADD CONSTRAINT "PlaceWorker_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceWorker" ADD CONSTRAINT "PlaceWorker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usedPromotions" ADD CONSTRAINT "usedPromotions_userRecordId_fkey" FOREIGN KEY ("userRecordId") REFERENCES "placeUserRecords"("id") ON DELETE CASCADE ON UPDATE CASCADE;
