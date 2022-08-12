import { Request, Response } from "express";
import { ConsultProductUseCaseAll } from "./ConsultUserUseCase";



class ConsultProductControllerAll {

    async handle(request: Request, response: Response) {

        const consultProductUseCaseAll = new ConsultProductUseCaseAll();

        const result = await consultProductUseCaseAll.execute();

        return response.json(result);
    }

}

export { ConsultProductControllerAll };