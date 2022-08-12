import { IUserRequest } from "./dtos/CreateUserDTO";
import { client } from "../../prisma/client";
import { AppError } from "../../errors/AppError";

class CreateUserUseCase {

    async execute({ name, user, cpf }: IUserRequest) {

        //verificar se o User existe
        const userAlreadyExists = await client.user.findFirst({
            where: {
                user
            }
        });
        if (userAlreadyExists) {
            throw new AppError("User already Exists!");
        }

        //Cadastrar o usuario
        const somatorio = 0;

        const username = await client.user.create({
            data: {
                name,
                user,
                cpf,
                summ: somatorio,
            }
        });

        return username;

    }

}

export { CreateUserUseCase };