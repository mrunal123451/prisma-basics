/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Profile2" (
    "id" SERIAL NOT NULL,
    "nameUpdated" TEXT NOT NULL,
    "designation" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile2_userId_key" ON "Profile2"("userId");

-- AddForeignKey
ALTER TABLE "Profile2" ADD CONSTRAINT "Profile2_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
