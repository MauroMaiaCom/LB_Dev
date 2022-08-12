import { Router } from "express";


import { CreateSalesController } from "../useCases/createSales/CreateSalesController";
import { ConsultSalesController } from "../useCases/consultSales/ConsultSalesController";


const createSalesController = new CreateSalesController();
const consultSalesController = new ConsultSalesController();


const userRoutes = Router();


userRoutes.post("/", createSalesController.handle);
userRoutes.get("/vendas", consultSalesController.handle);



export { userRoutes };