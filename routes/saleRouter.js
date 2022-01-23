import express from "express";
import codeRouter from "./codeRouter/codeRouter.js";
import promotionRouter from "./promotionRouter/promotionRouter.js"
const saleRouter = express.Router();

saleRouter.use("/promotion", promotionRouter);
saleRouter.use("/code", codeRouter);
export default saleRouter;


