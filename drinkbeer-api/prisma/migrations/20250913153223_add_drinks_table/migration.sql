-- AlterTable
ALTER TABLE "public"."GroupInvitation" ALTER COLUMN "expireDate" SET DEFAULT NOW() + INTERVAL '7 days';

-- CreateTable
CREATE TABLE "public"."Cocktail" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "isAlcoholic" BOOLEAN NOT NULL,
    "glassType" TEXT NOT NULL,
    "ingredients" TEXT[],
    "measurements" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cocktail_pkey" PRIMARY KEY ("id")
);
