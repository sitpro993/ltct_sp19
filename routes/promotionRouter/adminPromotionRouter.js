import express from "express";
import adminPromotionController from "../../controller/promotionController/adminPromotionController.js";
const adminPromotionRouter = express.Router();

//PATCH /api/sale/promotion/edit Chỉnh sửa Promotion
adminPromotionRouter.patch(
  "/edit",
  adminPromotionController.editPromotionController
);

//PATCH /api/sale/promotion/restore khôi phục Promotion sau khi xóa mềm
adminPromotionRouter.patch(
  "/restore",
  adminPromotionController.restorePromotionController
);

// //DELETE /api/sale/promotion/destroy Xóa vĩnh viễn Promotion
adminPromotionRouter.delete(
  "/destroy",
  adminPromotionController.destroyPromotionController
);

//DELETE /api/sale/promotion/delete xóa mềm Promotion
adminPromotionRouter.delete(
  "/delete",
  adminPromotionController.deletePromotionController
);

//POST /api/sale/promotion/create Tạo 1 Promotion
adminPromotionRouter.post(
  "/create",
  adminPromotionController.createPromotionController
);

//GET /api/sale/promotion/trash lấy danh sách Promotion trong thùng rác
adminPromotionRouter.get(
  "/trash",
  adminPromotionController.getTrashPromotionsController
);

//GET /api/sale/promotion/:id Lấy 1 Promotion theo id
adminPromotionRouter.get(
  "/:id",
  adminPromotionController.getPromotionDetailController
);

//GET /api/sale/promotion/ lấy danh sách Promotion
adminPromotionRouter.get(
  "/",
  adminPromotionController.getAllPromotionsController
);

export default adminPromotionRouter;
