/*
  Warnings:

  - You are about to drop the column `rate` on the `ConversionRate` table. All the data in the column will be lost.
  - Added the required column `amount` to the `ConversionRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ethAmount` to the `ConversionRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConversionRate" DROP COLUMN "rate",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ethAmount" DOUBLE PRECISION NOT NULL;
