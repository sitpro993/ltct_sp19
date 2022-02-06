import express from "express";
import userCodeController from "../../controller/codeController/userCodeController.js";

const userCodeRouter = express.Router();

//PATCH /api/sale/code/user/update cập nhật số lượng code đã dùng
userCodeRouter.patch("/update", userCodeController.updateCountCodeController);

//GET /api/sale/code/user/:id tìm code theo id
userCodeRouter.get("/:id", userCodeController.getByIdController);

//POST api/sale/code/user/ lấy code theo mã code
userCodeRouter.post("/", userCodeController.getCodeDetailController);

//GET /api/sale/code/user/ lấy toàn bộ mã code
userCodeRouter.get("/", userCodeController.getAllController);

export default userCodeRouter;
