import express from "express";
import codeController from "../../controller/codeController.js";

const codeRouter = express.Router();

//PATCH /api/sale/code/ sửa 1 mã KM
codeRouter.patch("/edit/:id", codeController.editCodeController);

//DELETE /api/sale/code/destroy xóa nhiều mã KM
codeRouter.delete("/destroy", codeController.destroyCodeController);

//POST /api/sale/code/ Tạo 1 mã KM
codeRouter.post("/create", codeController.createCodeController);

//GET /api/sale/code/ lấy mã KM theo id
codeRouter.get("/:id", codeController.getCodeDetailController);

//GET /api/sale/code/ lấy danh sách mã KM trong thùng rác
codeRouter.get("/trash", codeController.getTrashCodesController);

//GET /api/sale/code/ lấy danh sách toàn bộ mã KM
codeRouter.get("/", codeController.getAllCodesController);

export default codeRouter;
