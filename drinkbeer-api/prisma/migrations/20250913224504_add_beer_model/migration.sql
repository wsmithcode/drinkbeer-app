-- AlterTable
ALTER TABLE "public"."GroupInvitation" ALTER COLUMN "expireDate" SET DEFAULT NOW() + INTERVAL '7 days';

-- CreateTable
CREATE TABLE "public"."Beer" (
    "id" UUID NOT NULL,
    "idBeer" TEXT,
    "name" TEXT NOT NULL,
    "brands" TEXT,
    "category" TEXT[],
    "pictureUrl" TEXT,
    "country" TEXT,
    "abv" TEXT,

    CONSTRAINT "Beer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beer_idBeer_key" ON "public"."Beer"("idBeer");
