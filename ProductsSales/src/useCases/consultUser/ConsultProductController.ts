import { Request, Response } from "express";
import { ConsultProductUseCase } from "./ConsultProductUseCase";



class ConsultProductController {

    async handle(request: Request, response: Response) {
        const { name, marca } = request.body;

        const consultProductUseCase = new ConsultProductUseCase();

        const result = await consultProductUseCase.execute({
            name,
            marca
        });

        return response.json(result);
    }

}

export { ConsultProductController };