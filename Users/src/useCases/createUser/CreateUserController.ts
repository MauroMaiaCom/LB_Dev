import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";



class CreateUseController {

    async handle(request: Request, response: Response) {
        const { name, user, cpf } = request.body;

        const createUserUseCase = new CreateUserUseCase();

        const username = await createUserUseCase.execute({
            name,
            user,
            cpf
        });

        return response.json(username);
    }

}

export { CreateUseController };