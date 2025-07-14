-- AlterTable
ALTER TABLE "AComment" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "AHeart" ADD COLUMN     "canceled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PComment" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PHeart" ADD COLUMN     "canceled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
