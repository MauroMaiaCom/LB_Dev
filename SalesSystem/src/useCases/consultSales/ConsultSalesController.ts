import { Request, Response } from "express";
import { ConsultSalesUseCase } from "./ConsultSalesUseCase";



class ConsultSalesController {

    async handle(request: Request, response: Response) {

        const consultSalesUseCase = new ConsultSalesUseCase();

        const username = await consultSalesUseCase.execute();

        return response.json(username);
    }

}

export { ConsultSalesController };