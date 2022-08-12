import { Router } from "express";


import { userRoutes } from "./user.routes";


const routs = Router();


routs.use("/pharm", userRoutes);



export { routs };