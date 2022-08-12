import express from "express";
import helmet from "helmet";
import logger from "morgan";
import httpProxy from "express-http-proxy";


const app = express();
const PORT = 3000;



app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.json({ message: "Running Application" });
});

app.use("/users", httpProxy('http://localhost:3001', { timeout: 3000 }));
app.use("/products", httpProxy('http://localhost:3002', { timeout: 3000 }));
app.use("/system", httpProxy('http://localhost:3003', { timeout: 3000 }));


app.listen(PORT, () => { console.log(`Server is running from PORT: ${PORT}`) });