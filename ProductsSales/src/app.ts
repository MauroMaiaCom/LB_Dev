import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";


import { AppError } from "./errors/AppError";
import { routs } from "./routes";

require('dotenv/config');


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(routs);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal Server Error - ${err.message}`
    });
});

/*
app.get("/", (req, res) => { res.send("Products API") });
*/


app.listen(PORT, () => { console.log(`Users API is running from PORT: ${PORT}`) });