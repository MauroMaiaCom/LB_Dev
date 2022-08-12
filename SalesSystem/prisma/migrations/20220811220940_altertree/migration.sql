-- DropForeignKey
ALTER TABLE "productsales" DROP CONSTRAINT "productsales_productId_fkey";

-- AddForeignKey
ALTER TABLE "productsales" ADD CONSTRAINT "productsales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "requests"("datenow") ON DELETE RESTRICT ON UPDATE CASCADE;
