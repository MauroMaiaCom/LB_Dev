import { Router } from "express";


import { CreateProductController } from "../useCases/createProduct/CreateProductsController";
import { ConsultProductController } from "../useCases/consultUser/ConsultProductController";
import { ConsultProductControllerAll } from "../useCases/consultUserAll/ConsultProductController";
import { PutProductController } from "../useCases/PutProduct/PutProductController";


const createProductController = new CreateProductController();
const consultProductController = new ConsultProductController();
const consultProductControllerAll = new ConsultProductControllerAll();
const putProductController = new PutProductController();


const userRoutes = Router();


userRoutes.post("/", createProductController.handle);
userRoutes.get("/consult", consultProductController.handle);
userRoutes.get("/consult-all", consultProductControllerAll.handle);

userRoutes.post("/alter", putProductController.handle);



export { userRoutes };