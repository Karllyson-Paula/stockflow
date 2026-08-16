/*
  Warnings:

  - You are about to drop the column `quantidade` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the `Atributo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoria` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Atributo" DROP CONSTRAINT "Atributo_produtoId_fkey";

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "quantidade",
ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "marca" TEXT;

-- DropTable
DROP TABLE "Atributo";

-- CreateTable
CREATE TABLE "Variante" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "tamanho" TEXT,
    "cor" TEXT,
    "tecido" TEXT,
    "genero" TEXT,
    "produtoId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Variante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Variante" ADD CONSTRAINT "Variante_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
