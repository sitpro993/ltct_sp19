import express from "express";
import adminCodeController from  '../../controller/codeController/adminCodeController.js'

const adminCodeRouter = express.Router();

//PATCH /api/sale/code/admin/edit sửa 1 mã KM check   DONE 1
adminCodeRouter.patch("/edit", adminCodeController.editCodeController);

//PATCH /api/sale/code/admin/restore     DONE 1
adminCodeRouter.patch("/restore", adminCodeController.restoreCodeController);

//DELETE /api/sale/code/admin/delete   DONE 1
adminCodeRouter.delete("/delete", adminCodeController.deleteCodeController);

//DELETE /api/sale/code/admin/destroy xóa vĩnh viễn mã KM check DONE 
adminCodeRouter.delete("/destroy", adminCodeController.destroyCodeController);

//POST /api/sale/code/admin/create Tạo 1 mã KM check    DONE 1
adminCodeRouter.post("/create", adminCodeController.createCodeController);

//GET /api/sale/code/admin/trash lấy danh sách mã KM trong thùng rác check DONE  1
adminCodeRouter.get("/trash", adminCodeController.getTrashCodesController);

//GET /api/sale/code/admin/:id lấy mã KM theo id check DONE 1
adminCodeRouter.get("/:id", adminCodeController.getCodeDetailController);

//GET /api/sale/code/admin/ lấy danh sách toàn bộ mã KM check DONE 1
adminCodeRouter.get("/", adminCodeController.getAllCodesController);

export default adminCodeRouter;
