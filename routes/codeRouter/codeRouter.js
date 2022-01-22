import express from "express";
import adminCodeRouter from "./adminCodeRouter.js";
import userCodeRouter from "./userCodeRouter.js";

const codeRouter = express.Router();

// api/sale/code/user
codeRouter.use("/user", userCodeRouter);

// api/sale/code/admin
codeRouter.use("/admin", adminCodeRouter);

export default codeRouter;
