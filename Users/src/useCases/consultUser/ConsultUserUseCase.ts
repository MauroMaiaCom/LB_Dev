import { IUserRequest } from "./dtos/ConsultUserDTO";
import { client } from "../../prisma/client";
import { AppError } from "../../errors/AppError";

class ConsultUserUseCase {

    async execute({ user }: IUserRequest) {

        //verificar se o User existe
        const userAlreadyExists = await client.user.findFirst({
            where: {
                user
            }
        });
        if (!userAlreadyExists) {
            throw new AppError("User does not exist!");
        }

        // Chamar os pontos do User e suas Vendas

        const spots = await client.user.findUnique({
            where: {
                user
            },
            select: {
                user: true,
                summ: true,
                sale: true
            }
        });
        return spots;

    }

}

export { ConsultUserUseCase };