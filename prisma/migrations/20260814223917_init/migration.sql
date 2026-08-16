-- CreateTable
CREATE TABLE "Negocio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "alertaMin" INTEGER NOT NULL DEFAULT 5,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Negocio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "precoCusto" DOUBLE PRECISION NOT NULL,
    "precoVenda" DOUBLE PRECISION,
    "negocioId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atributo" (
    "id" SERIAL NOT NULL,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "produtoId" INTEGER NOT NULL,

    CONSTRAINT "Atributo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'usuario',
    "negocioId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atributo" ADD CONSTRAINT "Atributo_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
