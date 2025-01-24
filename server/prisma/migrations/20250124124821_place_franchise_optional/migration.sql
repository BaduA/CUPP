-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_franchiseCompanyId_fkey";

-- AlterTable
ALTER TABLE "places" ALTER COLUMN "franchiseCompanyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_franchiseCompanyId_fkey" FOREIGN KEY ("franchiseCompanyId") REFERENCES "franchiseCompanies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
