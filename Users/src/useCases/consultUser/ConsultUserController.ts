import { Request, Response } from "express";
import { ConsultUserUseCase } from "./ConsultUserUseCase";



class ConsultUserController {

    async handle(request: Request, response: Response) {
        const { user } = request.body;

        const consultUserUseCase = new ConsultUserUseCase();

        const username = await consultUserUseCase.execute({

            user

        });

        return response.json(username);
    }

}

export { ConsultUserController };