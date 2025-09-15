/*
  Warnings:

  - A unique constraint covering the columns `[name,ownerId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Group" ADD COLUMN     "ownerId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."GroupInvitation" ALTER COLUMN "expireDate" SET DEFAULT NOW() + INTERVAL '7 days';

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_ownerId_key" ON "public"."Group"("name", "ownerId");

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
