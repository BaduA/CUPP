-- CreateEnum
CREATE TYPE "GroupLevel" AS ENUM ('SILVER', 'GOLD', 'PLATINIUM');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('APP_OWNER', 'COMPANY_ADMIN', 'USER');

-- CreateTable
CREATE TABLE "earnedPlacePoints" (
    "id" SERIAL NOT NULL,
    "earnedPoint" INTEGER NOT NULL,
    "earnedMenuItemId" INTEGER NOT NULL,
    "userRecordId" INTEGER NOT NULL,

    CONSTRAINT "earnedPlacePoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "franchiseCompanies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brandPictureAddress" TEXT NOT NULL,

    CONSTRAINT "franchiseCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longtitude" DOUBLE PRECISION NOT NULL,
    "franchiseCompanyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placeImages" (
    "id" SERIAL NOT NULL,
    "imageAddress" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,

    CONSTRAINT "placeImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placeMenuItems" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageAddress" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,

    CONSTRAINT "placeMenuItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placePromotions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageAddress" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    "pointValue" INTEGER NOT NULL,
    "userRecordId" INTEGER NOT NULL,

    CONSTRAINT "placePromotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placeUserRecords" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,
    "totalPoint" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "placeUserRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profilePictureAddress" TEXT,
    "totalPoints" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- AddForeignKey
ALTER TABLE "earnedPlacePoints" ADD CONSTRAINT "earnedPlacePoints_earnedMenuItemId_fkey" FOREIGN KEY ("earnedMenuItemId") REFERENCES "placeMenuItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "earnedPlacePoints" ADD CONSTRAINT "earnedPlacePoints_userRecordId_fkey" FOREIGN KEY ("userRecordId") REFERENCES "placeUserRecords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_franchiseCompanyId_fkey" FOREIGN KEY ("franchiseCompanyId") REFERENCES "franchiseCompanies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeImages" ADD CONSTRAINT "placeImages_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeMenuItems" ADD CONSTRAINT "placeMenuItems_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placePromotions" ADD CONSTRAINT "placePromotions_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placePromotions" ADD CONSTRAINT "placePromotions_userRecordId_fkey" FOREIGN KEY ("userRecordId") REFERENCES "placeUserRecords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeUserRecords" ADD CONSTRAINT "placeUserRecords_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placeUserRecords" ADD CONSTRAINT "placeUserRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
