import { IUserRequest } from "./dtos/CreateProductsDTO";
import { client } from "../../prisma/client";
import { AppError } from "../../errors/AppError";

class CreateProductUseCase {

    async execute({ name, marca, valor, spots, inventory }: IUserRequest) {

        //verificar se o Produto existe existe
        const nproductAlreadyExists = await client.product.findFirst({
            where: {
                name
            }
        });
        const mproductAlreadyExists = await client.product.findUnique({
            where: {
                marca
            }
        });
        if (nproductAlreadyExists) {
            if (mproductAlreadyExists) {
                throw new AppError("Product Already Exists!");
            }
        }

        // Cdastrar o Produto
        const productname = await client.product.create({
            data: {
                name,
                marca,
                valor,
                spots,
                inventory
            }
        });

        return productname;
    }

}

export { CreateProductUseCase };