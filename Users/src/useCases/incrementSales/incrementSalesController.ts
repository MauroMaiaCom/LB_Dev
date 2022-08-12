import { Request, Response } from "express";
import { IncrementSalesUseCase } from "./IncrementSalesUseCase";



class IncrementSalesController {

    async handle(request: Request, response: Response) {
        const { user, name, marca, amount, spots } = request.body;

        const incrementSalesUseCase = new IncrementSalesUseCase();

        const sale = await incrementSalesUseCase.execute({
            user,
            name,
            marca,
            amount,
            spots
        });

        return response.json(sale);
    }

}

export { IncrementSalesController };