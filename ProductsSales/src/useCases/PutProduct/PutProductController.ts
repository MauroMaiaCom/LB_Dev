import { Request, Response } from "express";
import { PutProductUseCase } from "./PutProductUseCase";



class PutProductController {

    async handle(request: Request, response: Response) {
        const { name, marca, amount } = request.body;

        const putProductUseCase = new PutProductUseCase();

        const result = await putProductUseCase.execute({
            name,
            marca,
            amount
        });

        return response.json(result);
    }

}

export { PutProductController };