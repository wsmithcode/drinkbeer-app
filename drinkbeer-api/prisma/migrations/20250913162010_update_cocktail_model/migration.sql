/*
  Warnings:

  - A unique constraint covering the columns `[idDrink]` on the table `Cocktail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idDrink` to the `Cocktail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cocktail" ADD COLUMN     "idDrink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."GroupInvitation" ALTER COLUMN "expireDate" SET DEFAULT NOW() + INTERVAL '7 days';

-- CreateIndex
CREATE UNIQUE INDEX "Cocktail_idDrink_key" ON "public"."Cocktail"("idDrink");
