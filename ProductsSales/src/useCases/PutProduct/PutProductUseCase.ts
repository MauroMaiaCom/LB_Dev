import { IUserRequest } from "./DTOs/PutProductsDTO";
import { client } from "../../prisma/client";
import { AppError } from "../../errors/AppError";

class PutProductUseCase {

    async execute({ name, marca, amount }: IUserRequest) {

        //Saida de produto do estoque

        const amounprod = await client.product.findFirst({
            where: {
                name,
                marca
            }
        });
        if (amounprod) {
            const amountCurrent = amounprod.inventory;
            const newamount = amountCurrent - amount;

            const updateproduct = await client.product.updateMany({
                where: {
                    name,
                    marca
                },
                data: {
                    inventory: newamount
                }
            });

            return updateproduct;

        } else {
            throw new AppError("Deu Muita merda!");
        }

    }

}

export { PutProductUseCase };