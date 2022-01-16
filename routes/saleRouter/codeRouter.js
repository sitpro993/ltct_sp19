import express from "express";
import codeController from "../../controller/codeController.js";

const codeRouter = express.Router();

//PATCH /api/sale/code/ sửa 1 mã KM check
codeRouter.patch("/edit/:id", codeController.editCodeController);

//DELETE /api/sale/code/destroy xóa vĩnh viễn mã KM check
codeRouter.delete("/destroy", codeController.destroyCodeController);

//POST /api/sale/code/create Tạo 1 mã KM check
codeRouter.post("/create", codeController.createCodeController);

//GET /api/sale/code/trash lấy danh sách mã KM trong thùng rác check
codeRouter.get("/trash", codeController.getTrashCodesController);

//GET /api/sale/code/:id lấy mã KM theo id check
codeRouter.get("/:id", codeController.getCodeDetailController);

//GET /api/sale/code/ lấy danh sách toàn bộ mã KM check
codeRouter.get("/", codeController.getAllCodesController);

export default codeRouter;
