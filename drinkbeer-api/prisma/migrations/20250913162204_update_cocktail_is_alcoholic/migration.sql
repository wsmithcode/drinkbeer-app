-- AlterTable
ALTER TABLE "public"."Cocktail" ALTER COLUMN "isAlcoholic" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."GroupInvitation" ALTER COLUMN "expireDate" SET DEFAULT NOW() + INTERVAL '7 days';
