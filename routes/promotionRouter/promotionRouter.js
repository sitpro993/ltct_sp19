import express from "express";
import adminPromotionRouter from "./adminPromotionRouter.js"
import userCodeRouter from "./userPromotionRouter.js";
const codeRouter = express.Router();

// api/sale/promotion/user
codeRouter.use("/user", userCodeRouter);

// api/sale/promotion/admin/
codeRouter.use("/admin", adminPromotionRouter);

export default codeRouter;
