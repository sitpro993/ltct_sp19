import express from "express";
import userCodeController from "../../controller/codeController/userCodeController.js";

const userCodeRouter = express.Router();

userCodeRouter.patch("/update", userCodeController.updateCountCodeController);
userCodeRouter.get("/:id", userCodeController.getByIdController);
userCodeRouter.post("/", userCodeController.getCodeDetailController);
userCodeRouter.get("/", userCodeController.getAllController);

export default userCodeRouter;
