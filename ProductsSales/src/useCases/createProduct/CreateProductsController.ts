import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";



class CreateProductController {

    async handle(request: Request, response: Response) {
        const { name, marca, valor, spots, inventory } = request.body;

        const createProducUseCase = new CreateProductUseCase();

        const username = await createProducUseCase.execute({
            name,
            marca,
            valor,
            spots,
            inventory
        });

        return response.json(username);

    }

}

export { CreateProductController };