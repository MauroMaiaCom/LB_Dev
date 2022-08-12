import { Request, Response } from "express";
import { CreateSalesUseCase } from "./CreateSalesUseCase";



class CreateSalesController {

    async handle(request: Request, response: Response) {
        const { user, name, marca, amount } = request.body;

        const createSalesUseCase = new CreateSalesUseCase();

        const username = await createSalesUseCase.execute({
            user,
            name,
            marca,
            amount
        });

        return response.json(username);
    }

}

export { CreateSalesController };