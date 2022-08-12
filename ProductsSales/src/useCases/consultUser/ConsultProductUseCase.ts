import { IUserRequest } from "./DTOs/ConsultProductsDTO";
import { client } from "../../prisma/client";
import { AppError } from "../../errors/AppError";

class ConsultProductUseCase {

    async execute({ name, marca }: IUserRequest) {

        //Irá mostrar todos os produtos em estoque

        const productinventory = await client.product.findFirst({
            where: {

                name,
                marca,

                NOT: {
                    inventory: 0
                }
            }
        });
        if (!productinventory) {
            throw new AppError("Out of Stock Product!");
        }


        return productinventory;


    }

}

export { ConsultProductUseCase };