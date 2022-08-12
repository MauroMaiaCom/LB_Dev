-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productsales" (
    "user" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "spots" INTEGER NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "productsales_pkey" PRIMARY KEY ("user")
);

-- AddForeignKey
ALTER TABLE "productsales" ADD CONSTRAINT "productsales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
