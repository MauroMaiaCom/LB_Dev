import { Router } from "express";


import { CreateUseController } from "../useCases/createUser/CreateUserController";
import { IncrementSalesController } from "../useCases/incrementSales/incrementSalesController";
import { ConsultUserController } from "../useCases/consultUser/ConsultUserController";


const createUserController = new CreateUseController();
const incrementSalesController = new IncrementSalesController();
const consultUserController = new ConsultUserController();


const userRoutes = Router();


userRoutes.post("/", createUserController.handle);
userRoutes.post("/products", incrementSalesController.handle);
userRoutes.get("/consult", consultUserController.handle);



export { userRoutes };