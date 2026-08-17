/*
  Warnings:

  - You are about to drop the column `precoCusto` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `precoVenda` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `precoCusto` to the `Variante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "precoCusto",
DROP COLUMN "precoVenda";

-- AlterTable
ALTER TABLE "Variante" ADD COLUMN     "precoCusto" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "precoVenda" DOUBLE PRECISION;
