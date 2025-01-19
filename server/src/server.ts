import express, { Request, Response } from "express";
import "body-parser";
import { PORT } from "./secrets";
import rootRouter from "./infrastructures/routes";
import { errorMiddleware } from "./infrastructures/middlewares/error";

const bp = require("body-parser");

const app = express();

app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("App is working");
});

app.use("/", rootRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("App is up");
});
