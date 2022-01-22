import express from "express";
import promotionController from "../../controller/promotionController.js";

const promotionRouter = express.Router();

//PATCH /api/sale/promotion/edit/:id Chỉnh sửa CTKM
promotionRouter.patch("/edit/:id", promotionController.editPromotionController);

//PATCH /api/sale/promotion/restore khôi phục CTKM sau khi xóa mềm
promotionRouter.patch("/restore", promotionController.restorePromotionController);

//DELETE /api/sale/promotion/destroy Xóa vĩnh viễn CTKM
promotionRouter.delete("/destroy", promotionController.destroyPromotionController);

//DELETE /api/sale/promotion/delete xóa mềm CTKM
promotionRouter.delete("/delete", promotionController.deletePromotionController);

//POST /api/sale/promotion/create Tạo 1 CTKM
promotionRouter.post("/create", promotionController.createPromotionController);

//GET /api/sale/promotion/:id Lấy 1 CTKM theo id
promotionRouter.get("/:id", promotionController.getPromotionDetailController);

//GET /api/sale/promotion/trash lấy danh sách CTKM trong thùng rác
promotionRouter.get("/trash", promotionController.getTrashPromotionsController);

//GET /api/sale/promotion/ lấy danh sách CTKM
promotionRouter.get("/", promotionController.getAllPromotionsController);

export default promotionRouter;
