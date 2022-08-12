import { client } from "../../prisma/client";

class ConsultProductUseCaseAll {

    async execute() {

        //Irá mostrar todos os produtos em estoque

        const productinventory = await client.product.findMany({});

        return productinventory;


    }

}

export { ConsultProductUseCaseAll };