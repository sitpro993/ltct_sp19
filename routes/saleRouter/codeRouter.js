import express from "express";
import {
  getAllCodes,
  getTrashCodes,
  getCodeDetail,
  createCodeController,
  editCode,
  destroyCode,
} from "../../controller/codeController.js";

const codeRouter = express.Router();

//PATCH /api/sale/code/ sửa 1 mã KM
codeRouter.patch("/edit/:id", editCode);

//DELETE /api/sale/code/destroy xóa nhiều mã KM
codeRouter.delete("/destroy", destroyCode);

//POST /api/sale/code/ Tạo 1 mã KM
codeRouter.post("/create", createCodeController);

//GET /api/sale/code/ lấy mã KM theo id
codeRouter.get("/:id", getCodeDetail);

//GET /api/sale/code/ lấy danh sách mã KM trong thùng rác
codeRouter.get("/trash", getTrashCodes);

//GET /api/sale/code/ lấy danh sách toàn bộ mã KM
codeRouter.get("/", getAllCodes);

export default codeRouter;
