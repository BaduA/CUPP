/*
  Warnings:

  - The values [APP_OWNER,COMPANY_ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `city` to the `places` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('APP_ADMIN', 'USER');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "placeUserRecords" ALTER COLUMN "totalPoint" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "totalPoints" SET DEFAULT 0,
ALTER COLUMN "role" SET DEFAULT 'USER';
