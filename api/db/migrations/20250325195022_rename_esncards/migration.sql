/*
  Warnings:

  - You are about to drop the `ESNCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ESNCard" DROP CONSTRAINT "ESNCard_personId_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "date" SET DEFAULT NOW();

-- DropTable
DROP TABLE "ESNCard";

-- CreateTable
CREATE TABLE "MemberCard" (
    "cardnumber" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "section" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "MemberCard_pkey" PRIMARY KEY ("cardnumber")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberCard_personId_key" ON "MemberCard"("personId");

-- AddForeignKey
ALTER TABLE "MemberCard" ADD CONSTRAINT "MemberCard_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
