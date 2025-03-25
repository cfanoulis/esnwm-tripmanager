-- DropIndex
DROP INDEX "MemberCard_personId_key";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "date" SET DEFAULT NOW();
