import { client } from "../../prisma/client";

class ConsultSalesUseCase {

    async execute() {

        //verificar se o User existe
        const userAlreadyExists = await client.request.findMany({
            orderBy: {
                user: "asc",
            },
            include: {
                sale: {
                    orderBy: {
                        name: "asc"
                    }
                }
            }
        });

        return userAlreadyExists;

    }

}

export { ConsultSalesUseCase };