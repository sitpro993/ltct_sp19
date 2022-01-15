import express from "express";
import codeRouter from "./codeRouter.js";
import promotionRouter from "./promotionRouter.js";

const saleRouter = express.Router();

saleRouter.use("/promotion", promotionRouter);
saleRouter.use("/code", codeRouter);

export default saleRouter;
